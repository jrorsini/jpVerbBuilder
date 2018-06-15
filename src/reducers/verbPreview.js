const initialState = {
	kanji: null,
	hiragana: null,
	meaning: null,
	exampleList: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'FILL_PREVIEW':
			return state.verb;
			break;
		default:
			return state;
			break;
	}
};
