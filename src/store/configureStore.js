import { createStore, combineReducers } from 'redux';
import words from '../reducers/words';
import errorMessage from '../reducers/errorMessage';
import flashcard from '../reducers/flashcard';
import breadcrumb from '../reducers/searchBreadcrumb';
import kTokenizer from '../reducers/kTokenizer';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default () => {
	const store = createStore(
		combineReducers({
			words,
			errorMessage,
			flashcard,
			breadcrumb,
			kTokenizer,
			loadingBar: loadingBarReducer
		})
	);
	return store;
};
