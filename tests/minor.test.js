const isEnglish = txt => txt.match(/[^a-z/\s/\.\[\]\,\-]/gi) === null;

test('It should say the sentence is written in English', () => {
	expect(isEnglish('hello there')).toBe(true);
	expect(isEnglish('hello there.')).toBe(true);
});

test('It should say the sentence is written in Japanese', () => {
	expect(isEnglish('俺の名前はジャン。')).toBe(false);
	expect(isEnglish('俺の名前はtJean。')).toBe(false);
	expect(isEnglish('俺の名前はジャン.')).toBe(false);
	expect(isEnglish('「miptest（mip検査）」とも呼ばれる。')).toBe(false);
});
