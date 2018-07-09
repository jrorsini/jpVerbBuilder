const querystring = require('querystring');
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const searchHandler = word =>
	new Promise((resolve, reject) => {
		request(
			`https://ejje.weblio.jp/content/${querystring.escape(word)}`,
			(error, body, html) => {
				const $ = cheerio.load(html);
				const word = $('#h1Query').text();
				const meanings = $('.content-explanation')
					.text()
					.split('、');
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

				resolve({ word, meanings, examples });
			}
		);
	});

app.use(cors());

app.get('/search/:word', (req, res) => {
	searchHandler(req.params.word).then(res => res.send(res));
});

searchHandler('食べる').then(res => console.log(res));
searchHandler('eat').then(res => console.log(res));

app.listen(1234, () => console.log('Up & Running...'));
