import { createStore, combineReducers } from 'redux';
import verbs from '../reducers/verbs';

export default () => {
	const store = createStore(combineReducers({ verbs }));
	return store;
};
