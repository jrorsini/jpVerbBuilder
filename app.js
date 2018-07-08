const querystring = require('querystring');
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

app.use(cors());

app.get('/search/:word', (req, res) => {
	request(
		`https://ejje.weblio.jp/content/${querystring.escape(req.params.word)}`,
		(error, body, html) => {
			const $ = cheerio.load(html);
			const kanji = $('#h1Query').text();
			const hiragana = $('.summaryL .ruby').text();
			const meaning = $('.content-explanation').text();
			const exampleList = [];

			$('.qotC').each((i, e) => {
				const jp = $(e)
					.children()
					.eq(0)
					.text()
					.replace('例文帳に追加', '');
				const en = $(e)
					.children()
					.eq(1)
					.text()
					.split(/\s\-\s/)[0];
				jp &&
					en &&
					exampleList.push({
						jp,
						en
					});
			});

			res.send({
				kanji,
				hiragana,
				meaning,
				exampleList
			});
		}
	);
});

const execEngSearch = word =>
	new Promise((resolve, reject) => {
		// app.get(`/eng-search/${word}`, (req, res) => {
		request(`https://ejje.weblio.jp/content/${word}`, (error, body, html) => {
			// querystring.escape(req.params.word)
			const $ = cheerio.load(html);
			const word = $('#h1Query').text();

			resolve({ word });
		});
		// });
	});

execEngSearch('test').then(res => console.log(res));

app.listen(1234, () => console.log('Up & Running...'));
