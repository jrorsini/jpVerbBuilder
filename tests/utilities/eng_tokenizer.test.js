import { isEnglish, engTokenize } from '../../src/utilities/eng_tokenizer';

test('It should say the sentence is written in English', () => {
	expect(isEnglish('Well, well!')).toBe(true);
	expect(isEnglish('hello there.')).toBe(true);
	expect(isEnglish("Well, well, you're quite a stranger.")).toBe(true);
});

test('It should say the sentence is written in Japanese', () => {
	expect(isEnglish('俺の名前はジャン。')).toBe(false);
	expect(isEnglish('俺の名前はtJean。')).toBe(false);
	expect(isEnglish('俺の名前はジャン.')).toBe(false);
	expect(isEnglish('「miptest（mip検査）」とも呼ばれる。')).toBe(false);
});

test('It should say that some special characters are being inputed', () => {
	expect(containSpecialChar('-')).toBe(true);
	expect(containSpecialChar('=')).toBe(true);
	expect(containSpecialChar('!')).toBe(true);
	expect(containSpecialChar('}')).toBe(true);
	expect(containSpecialChar('{')).toBe(true);
	expect(containSpecialChar('|')).toBe(true);
	expect(containSpecialChar('~')).toBe(true);
	expect(containSpecialChar('>')).toBe(true);
	expect(containSpecialChar('<')).toBe(true);
	expect(containSpecialChar('=')).toBe(true);
	expect(containSpecialChar('@')).toBe(true);
	expect(containSpecialChar('#')).toBe(true);
	expect(containSpecialChar('?')).toBe(true);
	expect(containSpecialChar('^')).toBe(true);
	expect(containSpecialChar('_')).toBe(true);
	expect(containSpecialChar('`')).toBe(true);
	expect(containSpecialChar('/')).toBe(true);
	expect(containSpecialChar('*')).toBe(true);
	expect(containSpecialChar('+')).toBe(true);
	expect(containSpecialChar(';')).toBe(true);
	expect(containSpecialChar(':')).toBe(true);
	expect(containSpecialChar('.')).toBe(true);
	expect(containSpecialChar(',')).toBe(true);
	expect(containSpecialChar('#')).toBe(true);
	expect(containSpecialChar('$')).toBe(true);
	expect(containSpecialChar('%')).toBe(true);
	expect(containSpecialChar('&')).toBe(true);
	expect(containSpecialChar('(')).toBe(true);
	expect(containSpecialChar(')')).toBe(true);
	expect(containSpecialChar('?')).toBe(true);
	expect(containSpecialChar('[')).toBe(true);
	expect(containSpecialChar(']')).toBe(true);
	expect(containSpecialChar("'")).toBe(true);
	expect(containSpecialChar('"')).toBe(true);

	expect(containSpecialChar('test')).toBe(false);
});
