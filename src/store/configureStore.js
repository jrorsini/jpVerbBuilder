import { createStore, combineReducers } from 'redux';
import verbs from '../reducers/verbs';
import verbPreview from '../reducers/verbPreview';

export default () => {
	const store = createStore(combineReducers({ verbs, verbPreview }));
	return store;
};
