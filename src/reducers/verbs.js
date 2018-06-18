const initialState =
	localStorage.getItem('verbs') !== null
		? JSON.parse(localStorage.getItem('verbs'))
		: [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_VERB':
			let isAlreadyThere = 0;
			state.map(verb => {
				if (verb.kanji === action.verb.kanji) {
					isAlreadyThere = 1;
				}
				return verb;
			});
			return isAlreadyThere ? state : state.concat(action.verb);
			break;
		case 'REMOVE_VERB':
			return state.filter(verb => verb.id !== action.id);
			break;
		default:
			return state;
			break;
	}
};
