const initialState = [];

const verbReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_VERB':
			return { ...state, verbs: state.verbs.concat(action.verb) };
			break;
		case 'REMOVE_VERB':
			return {
				...state,
				verbs: state.verbs.filter(verb => verb.id !== action.id)
			};
			break;
		default:
			break;
	}
};

export default verbReducer;
