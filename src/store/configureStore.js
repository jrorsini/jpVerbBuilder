import { createStore, combineReducers } from 'redux';
import verbsReducer from '../reducers/verbs';

export default () => {
	const store = createStore(combineReducers({ verbs: verbsReducer }));
	return store;
};
