const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

app.use(cors());

app.get('/search/:word', (req, res) => {
	request(
		`https://ejje.weblio.jp/content/${req.params.word}`,
		(error, body, html) => {
			const $ = cheerio.load(html);
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
				exampleList.push({
					jp,
					en
				});
			});
			res.send(exampleList.filter(e => e.jp !== ''));
		}
	);
});

app.listen(1234, () => console.log('Up & Running...'));
