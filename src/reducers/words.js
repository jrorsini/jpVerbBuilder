const initialState =
	localStorage.getItem('words') !== null
		? JSON.parse(localStorage.getItem('words'))
		: [];

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_WORD':
			let isAlreadyThere = 0;
			if (state.length === 0) return state.concat(action.word);
			state.map(w => {
				if (w.word === action.word.word) isAlreadyThere = 1;
				return w;
			});
			return isAlreadyThere ? state : state.concat(action.word);
			break;
		case 'REMOVE_WORD':
			return state.filter(w => w.word !== action.word);
			break;
		default:
			return state;
			break;
	}
};
