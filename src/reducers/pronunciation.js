const initialState = {
	current: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_HIRAGANA':
			return { current: action.load };
			break;
		default:
			return state;
			break;
	}
};
