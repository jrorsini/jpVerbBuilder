import { tokenize, getTokenizer } from 'kuromojin';

getTokenizer({ dicPath: '/dict' });

export const addToDrill = load => ({
	type: 'ADD_TO_DRILL',
	load
});

export const removeFromDrill = load => ({
	type: 'REMOVE_FROM_DRILL',
	load
});

export const setCurrentVerb = load => {
	tokenize(load).then(load => ({
		type: 'SET_CURRENT_VERB',
		load
	}));
};

export const startSettingCurrentVerb = load => {
	return dispatch => {
		dispatch(
			setCurrentVerb({
				id: ref.key,
				...word
			})
		);
		tokenize(load).then(res => {
			dispatch(setCurrentVerb(res[0]));
		});
	};
};

export const setCurrentForm = load => ({
	type: 'SET_CURRENT_FORM',
	load
});
