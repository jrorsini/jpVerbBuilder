const querystring = require('querystring');
const express = require('express');
const cors = require('cors');
const app = express();
const request = require('request');
const cheerio = require('cheerio');
const kuromoji = require('kuromoji');

const speechPart = {
	'*': 'general',
	名詞: 'noun',
	動詞: 'verb',
	副詞: 'adverb',
	記号: 'symbol',
	助詞: 'particle',
	接頭詞: 'prefix',
	形容詞: 'adjective',
	接続詞: 'conjuction',
	感動詞: 'interjection',
	助動詞: 'auxiliaryVerb',
	連体詞: 'adnominalAdjective',
	フィラー: 'filler'
};

const speechPart1 = {
	数: 'number',
	空白: 'blank space',
	句点: 'sign-period',
	接尾: 'suffix',
	一般: 'common',
	自立: 'independent',
	特殊: 'special',
	副詞化: 'adverb',
	代名詞: 'pronoun',
	括弧開: 'brackets',
	非自立: 'dependent',
	括弧閉: 'close braket',
	連体化: 'abdominal-adj',
	係助詞: 'binding particle',
	副助詞: 'adverbial particle?',
	格助詞: 'particle-case marking',
	終助詞: 'sentence-ending particle',
	固有名詞: 'proper noun?',
	サ変接続: 'irr-conjuction',
	並立助詞: 'parallel marker',
	名詞接続: 'noun conjonction',
	接続助詞: 'conjunctive particle?',
	助詞類接続: 'particle-conjunctive',
	形容動詞語幹: 'adjective-common',
	アルファベット: ' alphabet',
	ナイ形容詞語幹: 'i-adjective',
	'副助詞／並立助詞／終助詞': 'adverbial particle​'
};

const speechPart2 = {
	人名: "person's name?",
	引用: 'quotation',
	組織: 'structure',
	地域: 'region',
	助数詞: 'counter suffix',
	助動詞語幹: 'auxiliary verb? stem',
	副詞可能: 'potential-adverb'
};

const speechPart3 = {
	名: 'name',
	姓: 'surname',
	国: 'country'
};

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
				const type = isEnglish(word)
					? ''
					: speechPart[_tokenizer.tokenize(word)[0]['pos']];
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
						? pArr.push(_tokenizer.tokenize(e.translated.replace('.', '')))
						: pArr.push(_tokenizer.tokenize(e.original.replace('.', '')));
				});

				Promise.all(pArr).then(arr => {
					resolve({
						word,
						reading,
						meanings,
						type,
						examples: examples
							// .filter(e => e.original.length < 40)
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
		searchHandler('食べる');
		searchHandler('試験');
		searchHandler('eat');
	});

app.listen(1234, () => console.log('Up & Running...'));
