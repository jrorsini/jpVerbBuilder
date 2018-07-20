const initialState = {
	current: null,
	panels: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'EXTEND_PANEL':
			{
				let isThere = false;
				state.panels.map(e => {
					if (e.word === action.load.word) isThere = true;
				});
				return !isThere
					? { ...state, panels: state.panels.concat(action.load) }
					: state;
			}

			break;
		case 'SET_CURRENT_PANEL':
			// console.log(action.load);
			return { ...state, current: action.load };
			break;
		default:
			return state;
			break;
	}
};
