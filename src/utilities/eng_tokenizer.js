const replacer = match => {
	return match.trim() !== '' ? ` ${match} ` : ' ';
};

export const isEnglish = txt =>
	txt.match(
		/[^a-z/\s/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)]/gi
	) === null;

export const engTokenize = sentence =>
	sentence.replace(/[^a-zA-Z0-9&$]/gi, replacer);

export const capString = s =>
	s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
