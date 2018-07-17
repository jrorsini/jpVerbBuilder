const initialState = [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'EXTEND_BC':
			return state.indexOf(action.load) === -1
				? state.concat(action.load)
				: state;
			break;
		default:
			return state;
			break;
	}
};
