const querystring = require('querystring');
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const kuromoji = require('kuromoji');

const replacer = match => {
	return match.trim() !== '' ? ` ${match} ` : ' ';
};

const isEnglish = txt =>
	txt.match(
		/[^a-z/\s/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)]/gi
	) === null;

const engTokenize = sentence =>
	sentence.replace(/[^a-zA-Z0-9&$]/gi, replacer).split(/\s/gi);

const capString = s => s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);

let _tokenizer;

const searchHandler = word =>
	new Promise((resolve, reject) => {
		request(
			`https://ejje.weblio.jp/content/${querystring.escape(word)}`,
			(error, body, html) => {
				const $ = cheerio.load(html);
				const pArr = [];
				const word = $('#h1Query').text()
					? capString($('#h1Query').text())
					: $('#h1Query').text();
				const reading = $('.ruby').text() || null;
				const meanings = $('.content-explanation')
					.text()
					.split('、')
					.map(
						meaning =>
							(meaning.match(/\)/, 'gi') &&
								meaning
									.replace(/\;/gi, ',')
									.split(')')[1]
									.trim()) ||
							meaning.replace(/\;/gi, ',')
					);
				const examples = [];

				$('.qotC').each((i, e) => {
					const original = $(e)
						.children()
						.eq(0)
						.text()
						.replace('例文帳に追加', '');
					const translated = $(e)
						.children()
						.eq(1)
						.text()
						.split(/\s\-\s/)[0];
					original &&
						translated &&
						examples.push({
							original,
							translated
						});
				});

				examples.map(e => {
					isEnglish(e.original)
						? pArr.push(_tokenizer.tokenize(e.original))
						: pArr.push(_tokenizer.tokenize(e.translated));
				});

				Promise.all(pArr).then(arr => {
					resolve({
						word,
						reading,
						meanings,
						examples: examples
							.filter(e => e.original.length < 40)
							.map((e, i) => ({
								original: isEnglish(word)
									? engTokenize(capString(e.original))
									: arr[i],
								translated: !isEnglish(word)
									? engTokenize(capString(e.translated))
									: arr[i]
							}))
					});
				});
			}
		);
	});

app.use(cors());

app.get('/search/:word', (req, res) => {
	searchHandler(req.params.word).then(obj => res.send(obj));
});

kuromoji
	.builder({ dicPath: 'node_modules/kuromoji/dict/' })
	.build(function(err, tokenizer) {
		_tokenizer = tokenizer;
		// searchHandler('食べる').then(res => console.log(res));
		// searchHandler('試験').then(res => console.log(res));
		// searchHandler('eat').then(res => console.log(res));
	});

app.listen(1234, () => console.log('Up & Running...'));
