const initialState =
	localStorage.getItem('words') !== null
		? JSON.parse(localStorage.getItem('words'))
		: [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_WORD':
			let isAlreadyThere = 0;
			state.map(w => {
				if (w.word === action.word.word) isAlreadyThere = 1;
				return word;
			});
			return isAlreadyThere ? state : state.concat(action.verb);
			break;
		case 'REMOVE_WORD':
			return state.filter(w => w.word !== action.word);
			break;
		default:
			return state;
			break;
	}
};
