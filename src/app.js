import React from 'react';
import Header from './components/Header';
import ListPage from './components/pages/ListPage';
import SearchPage from './components/pages/SearchPage';
import WordPracticePage from './components/pages/WordPracticePage';
import WordPage from './components/pages/WordPage';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = configureStore();

document.addEventListener('keydown', e => {
	if (window.location.pathname === '/word-practice' && e.keyCode === 13)
		console.log('test');
	// props.dispatch(setQuestion(generateQuestion()));
});

store.subscribe(() => {
	console.log(store.getState());
	localStorage.setItem('verbs', JSON.stringify(store.getState().verbs));
});

const App = () => (
	<Router>
		<div>
			<Header />
			<Route exact path="/" component={SearchPage} />
			<Route path="/list" component={ListPage} />
			<Route path="/word-practice" component={WordPracticePage} />
			<Route path="/word/:word" component={WordPage} />
		</div>
	</Router>
);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
