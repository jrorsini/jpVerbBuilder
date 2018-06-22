const initialState = {
	question: null,
	answer: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'FILL_PREVIEW':
			return action.question;
			break;
		default:
			return state;
			break;
	}
};
