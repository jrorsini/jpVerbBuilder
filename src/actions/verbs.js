export const addWord = word => ({
	type: 'ADD_WORD',
	word
});

export const removeWord = kanji => ({
	type: 'REMOVE_WORD',
	kanji
});
