import { createStore } from 'redux';

const verbSample = {
	id: '12345',
	kanji: '食べる',
	hiragana: 'たべる',
	meaning: 'to eat'
};
const initialState = [];

/**
 ACTIONS */
const addVerb = verb => ({
	type: 'ADD_VERB',
	verb
});

/**
 REDUCERS */

const verbReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_VERB':
			return [...state.concat(action.verb)];
			break;

		default:
			break;
	}
};

const store = createStore(verbReducer);

store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(addVerb(verbSample));
store.dispatch(addVerb(verbSample));
store.dispatch(addVerb(verbSample));
