const initialState = {
	current: null,
	started: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_HIRAGANA':
			return { ...state, current: action.load };
			break;
		case 'START_DRILL':
			return { ...state, started: true };
		case 'STOP_DRILL':
			return { ...state, started: false };
		default:
			return state;
			break;
	}
};
