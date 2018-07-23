const querystring = require('querystring');
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const kuromoji = require('kuromoji');

kuromoji
	.builder({ dicPath: 'node_modules/kuromoji/dict/' })
	.build(function(err, tokenizer) {
		// tokenizer is ready
		var path = tokenizer.tokenize('すもももももももものうち');
		console.log(path);
	});

const capString = s => s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);

const searchHandler = word =>
	new Promise((resolve, reject) => {
		request(
			`https://ejje.weblio.jp/content/${querystring.escape(word)}`,
			(error, body, html) => {
				const $ = cheerio.load(html);
				const word = $('#h1Query').text();
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

				resolve({
					word,
					reading,
					meanings,
					examples: examples.filter(e => e.original.length < 40).map(e => ({
						original: capString(e.original),
						translated: capString(e.translated)
					}))
				});
			}
		);
	});

app.use(cors());

app.get('/search/:word', (req, res) => {
	searchHandler(req.params.word).then(obj => res.send(obj));
});

// searchHandler('食べる').then(res => console.log(res));
searchHandler('試験').then(res => console.log(res));
// searchHandler('eat').then(res => console.log(res));

app.listen(1234, () => console.log('Up & Running...'));
