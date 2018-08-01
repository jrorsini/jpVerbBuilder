import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// COMPONENT
import Header from './components/Header';

// PAGES
import WordBookPage from './components/pages/WordBook';
import SearchPage from './components/pages/Search';
import TrainingPage from './components/pages/Training';
import VideosPagePage from './components/pages/VideosPage';
import VideoPagePage from './components/pages/VideoPage';
import PronunciationPage from './components/pages/Pronunciation';
import WordDetailsPage from './components/pages/WordDetails';
import ConjugationPage from './components/pages/Conjugation.js';

// STORE SETTINGS
import configureStore from './store/configureStore';

// UTILITIES
import { tokenize, getTokenizer } from 'kuromojin';

// ACTIONS
import { setQuestion, setAnswer } from './actions/flashcard';

// STYLE
import 'normalize.css/normalize.css';
import './styles/style.scss';

// import './firebase/firebase';

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
	localStorage.setItem('words', JSON.stringify(store.getState().words));
	console.log(store.getState().conjugation.current);
});

const App = () => (
	<Router>
		<div>
			<Header />
			<Route exact path="/search" component={SearchPage} />
			<Route path="/wordbook" component={WordBookPage} />
			<Route path="/videos" component={VideosPagePage} />
			<Route path="/training" component={TrainingPage} />
			<Route path="/practice/conjugation" component={ConjugationPage} />
			<Route path="/practice/pronunciation" component={PronunciationPage} />
			<Route path="/word/:word" component={WordDetailsPage} />
			<Route path="/video/:video" component={VideoPagePage} />
		</div>
	</Router>
);

getTokenizer({ dicPath: '/dict' });

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
