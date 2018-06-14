import { createStore } from 'redux';

const verbSample = {
	id: '12345',
	kanji: '食べる',
	hiragana: 'たべる',
	meaning: 'to eat'
};

const verbSampleTwo = {
	id: '123456',
	kanji: '飲む',
	hiragana: 'のむ',
	meaning: 'to drink'
};

/**
 REDUCERS */

const store = createStore(verbReducer);

store.subscribe(() => {
	console.log(store.getState());
});

store.dispatch(addVerb(verbSample));
store.dispatch(addVerb(verbSampleTwo));
store.dispatch(removeVerb(verbSample.id));
