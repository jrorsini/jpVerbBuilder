import { createStore, combineReducers } from 'redux';
import words from '../reducers/words';
import errorMessage from '../reducers/errorMessage';
import flashcard from '../reducers/flashcard';
import breadcrumb from '../reducers/searchBreadcrumb';

export default () => {
	const store = createStore(
		combineReducers({ words, errorMessage, flashcard, breadcrumb })
	);
	return store;
};
