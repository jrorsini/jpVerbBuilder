import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import words from '../reducers/words';
import errorMessage from '../reducers/errorMessage';
import flashcard from '../reducers/flashcard';
import breadcrumb from '../reducers/searchBreadcrumb';
import pronunciation from '../reducers/pronunciation';
import kTokenizer from '../reducers/kTokenizer';
import { loadingBarReducer } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
	const store = createStore(
		combineReducers({
			words,
			errorMessage,
			flashcard,
			breadcrumb,
			kTokenizer,
			pronunciation,
			conjugation,
			loadingBar: loadingBarReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);
	return store;
};
