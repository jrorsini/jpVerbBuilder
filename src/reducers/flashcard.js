const initialState = {
	question: null,
	answer: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_QUESTION':
			return { ...state, question: action.question };
			break;
		default:
			return state;
			break;
	}
};
