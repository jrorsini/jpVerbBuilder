/**
 Action that takes a word's object as an argument */
const emptyPreview = {
	word: null,
	reading: null,
	meanings: null,
	examples: null
};

export const setPreview = (word = emptyPreview) => ({
	type: 'FILL_PREVIEW',
	word
});
