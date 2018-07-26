const initialState = {
	current: null,
	started: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'SET_HIRAGANA':
			return { current: action.load };
			break;
		case 'START_DRILL':
			console.log({ ...state, started: true });
			return { ...state, started: true };
		case 'STOP_DRILL':
			return { ...state, started: false };
		default:
			return state;
			break;
	}
};
