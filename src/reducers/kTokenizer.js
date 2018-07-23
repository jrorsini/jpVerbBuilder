const initialState = null;

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_TOKENIZER':
			return action.load;
			break;
		default:
			return state;
			break;
	}
};
