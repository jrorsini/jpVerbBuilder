const initialState = {
	formsToDrill: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_TO_DRILL':
			return { ...state, formsToDrill: state.formsToDrill.concat(action.load) };
			break;

		case 'REMOVE_FROM_DRILL':
			return {
				...state,
				formsToDrill: state.formsToDrill.filter(e => e !== action.load)
			};
			break;
		default:
			return state;
			break;
	}
};
