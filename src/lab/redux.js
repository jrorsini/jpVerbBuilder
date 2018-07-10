import { createStore } from 'redux';
import { removeWord } from '../actions/verbs';

const verbSample = {
	id: '12345',
	kanji: '食べ�?',
	hiragana: 'たべ�?',
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

store.dispatch(addWord(verbSample));
store.dispatch(addWord(verbSampleTwo));
store.dispatch(removeWord(verbSample.id));
