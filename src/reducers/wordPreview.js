const initialState = {
	word: null,
	reading: null,
	meanings: null,
	examples: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'FILL_PREVIEW':
			return action.word;
			break;
		default:
			return state;
			break;
	}
};
