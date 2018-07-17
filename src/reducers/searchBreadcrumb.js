const initialState = {
	current: null,
	panels: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'EXTEND_PANEL':
			return state.panels.indexOf(action.load) === -1
				? { ...state, panels: state.panels.concat(action.load) }
				: state;
			break;
		case 'SET_CURRENT_PANEL':
			return { ...state, current: action.load };
			break;
		default:
			return state;
			break;
	}
};
