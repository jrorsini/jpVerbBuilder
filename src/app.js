import React from 'react';
import Header from './components/Header';
import ListPage from './components/pages/ListPage';
import SearchPage from './components/pages/SearchPage';
import WordPracticePage from './components/pages/WordPracticePage';
import WordPage from './components/pages/WordPage';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { setQuestion } from './actions/flashcard';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/style.scss';

const store = configureStore();

/**
	This is for the flashcard section, 
	setting it up into the component itself will re add the event hence firing multiple actions.
 */
const generateQuestion = () => {
	const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
	const wordIndex = getRandomInt(store.getState().verbs.length);
	const exampleIndex = getRandomInt(
		store.getState().verbs[wordIndex].exampleList.length
	);
	const obj = store.getState().verbs[wordIndex];
	const qObj = obj.exampleList[exampleIndex];
	return {
		jp: qObj.jp.split(obj.kanji),
		en: qObj.en
	};
};

document.addEventListener('keydown', e => {
	if (window.location.pathname === '/word-practice' && e.keyCode === 13) {
		store.dispatch(setQuestion(generateQuestion()));
		document.getElementById('answerInput').value = '';
	}
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
