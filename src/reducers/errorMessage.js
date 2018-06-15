const initialState = null;

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_ERROR':
			return action.text;
			break;
		default:
			return state;
			break;
	}
};
