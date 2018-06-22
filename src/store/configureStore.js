import { createStore, combineReducers } from 'redux';
import verbs from '../reducers/verbs';
import verbPreview from '../reducers/verbPreview';
import errorMessage from '../reducers/errorMessage';
import flashcard from '../reducers/flashcard';

export default () => {
	const store = createStore(
		combineReducers({ verbs, verbPreview, errorMessage, flashcard })
	);
	return store;
};
