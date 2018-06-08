const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

app.use(cors());
// `https://glosbe.com/gapi/translate?from=eng&dest=fra&format=json&phrase=${req.params.word}`,

app.get('/search/:word', (req, res) => {
	request(
		'https://ejje.weblio.jp/content/%E9%A3%9F%E3%81%B9%E3%82%8B',
		(error, body, html) => {
			console.log(html);
		}
	);
});

request(
	'https://ejje.weblio.jp/content/%E9%A3%9F%E3%81%B9%E3%82%8B',
	(error, body, html) => {
		const $ = cheerio.load(html);
		console.log($('#h1Query').text());
	}
);

app.listen(1234, () => console.log('Up & Running...'));
