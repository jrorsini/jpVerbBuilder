import { createStore, combineReducers } from 'redux';
import verbs from '../reducers/verbs';
import verbPreview from '../reducers/verbPreview';
import errorMessage from '../reducers/errorMessage';

export default () => {
	const store = createStore(
		combineReducers({ verbs, verbPreview, errorMessage })
	);
	return store;
};