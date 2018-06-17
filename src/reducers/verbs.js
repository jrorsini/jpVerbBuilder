const initialState =
	localStorage.getItem('verbs') !== null
		? JSON.parse(localStorage.getItem('verbs'))
		: [];
export default (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_VERB':
			return state.concat(action.verb);
			break;
		case 'REMOVE_VERB':
			return state.filter(verb => verb.id !== action.id);
			break;
		default:
			return state;
			break;
	}
};
