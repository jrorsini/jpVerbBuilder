const initialState =
	localStorage.getItem('words') !== null
		? JSON.parse(localStorage.getItem('words'))
		: [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_VERB':
			let isAlreadyThere = 0;
			state.map(word => {
				if (word.word === action.word.word) isAlreadyThere = 1;
				return word;
			});
			return isAlreadyThere ? state : state.concat(action.verb);
			break;
		case 'REMOVE_VERB':
			return state.filter(word => word.word !== action.word);
			break;
		default:
			return state;
			break;
	}
};
