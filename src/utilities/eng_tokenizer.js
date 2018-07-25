const replacer = match => {
	return match.trim() !== '' ? ` ${match} ` : ' ';
};

export const containSpecialChar = s => {
	const regex = new RegExp('["\'-=!}{@`?~|/><=#?^_*+,.\\]\\[:;#$%&)(]', 'g');
	return s.match(regex) === null ? false : true;
};

export const isEnglish = txt =>
	txt.match(
		/[^a-z/\s/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)]/gi
	) === null;

export const engTokenize = sentence =>
	sentence.replace(/[^a-zA-Z0-9&$]/gi, replacer);

export const capString = s =>
	s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
