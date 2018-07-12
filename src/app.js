import React from 'react';
import Header from './components/Header';
import ListPage from './components/pages/ListPage';
import SearchPage from './components/pages/SearchPage';
import VideosPage from './components/pages/VideosPage';
import VideoPage from './components/pages/VideoPage';
import WordPracticePage from './components/pages/WordPracticePage';
import WordPage from './components/pages/WordPage';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { tokenize, getTokenizer } from 'kuromojin';
import { setQuestion, setAnswer } from './actions/flashcard';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/style.scss';

getTokenizer({ dicPath: '/dict' });

const store = configureStore();

/**
	This is for the flashcard section, 
	setting it up into the component itself will re add the event hence firing multiple actions.
 */
const generateQuestionAnswer = () => {
	const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
	const wordIndex = getRandomInt(store.getState().verbs.length);
	const exampleIndex = getRandomInt(
		store.getState().verbs[wordIndex].exampleList.length
	);
	const obj = store.getState().verbs[wordIndex];
	const qObj = obj.exampleList[exampleIndex];
	return {
		question: {
			jp: qObj.jp.split(obj.kanji),
			en: qObj.en
		},
		answer: obj.kanji
	};
};

document.addEventListener('keydown', e => {
	if (window.location.pathname === '/word-practice' && e.keyCode === 13) {
		const userAnswer =
			document.getElementById('answerInput') &&
			document.getElementById('answerInput').value;
		store.dispatch(setAnswer(''));
		const genQA = generateQuestionAnswer();
		store.dispatch(setQuestion(genQA.question));
		document.getElementById('answerInput').value = '';
		tokenize(genQA.answer).then(res => console.log(res));
		store.dispatch(setAnswer(genQA.answer));
	}
});

store.subscribe(() => {
	console.log(store.getState());
	console.log(localStorage.getItem('words'));
	localStorage.setItem('words', JSON.stringify(store.getState().words));
});

const App = () => (
	<Router>
		<div>
			<Header />
			<Route exact path="/" component={SearchPage} />
			<Route path="/list" component={ListPage} />
			<Route path="/videos" component={VideosPage} />
			<Route path="/word-practice" component={WordPracticePage} />
			<Route path="/word/:word" component={WordPage} />
			<Route path="/video/:video" component={VideoPage} />
		</div>
	</Router>
);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
