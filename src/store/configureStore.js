import { createStore, combineReducers } from 'redux';
import words from '../reducers/words';
import errorMessage from '../reducers/errorMessage';
import flashcard from '../reducers/flashcard';
import breadcrumb from '../reducers/searchBreadcrumb';
import pronunciation from '../reducers/pronunciation';
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
			pronunciation,
			loadingBar: loadingBarReducer
		})
	);
	return store;
};
