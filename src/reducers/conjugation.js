const initialState = {
	verbs: ['食べる', '泳ぐ', '飲む', '書く', '呼ぶ', '待つ', '誘う', '言う'],
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
