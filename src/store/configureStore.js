import { createStore, combineReducers } from 'redux';
import verbs from '../reducers/verbs';
import wordPreview from '../reducers/wordPreview';
import errorMessage from '../reducers/errorMessage';
import flashcard from '../reducers/flashcard';

export default () => {
	const store = createStore(
		combineReducers({ verbs, wordPreview, errorMessage, flashcard })
	);
	return store;
};
