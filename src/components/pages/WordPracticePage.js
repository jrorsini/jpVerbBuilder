import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setQuestion } from '../../actions/flashcard';

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const WordPractice = props => {
	const generateQuestion = () => {
		const wordIndex = getRandomInt(props.verbs.length);
		const exampleIndex = getRandomInt(
			props.verbs[wordIndex].exampleList.length
		);
		return props.verbs[wordIndex].exampleList[exampleIndex];
	};

	const keyDownEvenHandler = e => {
		window.location.pathname === '/word-practice' &&
			e.keyCode === 13 &&
			setQuestion('test');
		console.log(props);
	};

	document.addEventListener('keydown', keyDownEvenHandler);
	return (
		<div className="container">
			<div>{props.flashcard.question}</div>
			<div>Answer</div>
		</div>
	);
};

const mapStateToProps = state => {
	console.log(state);
	return state;
};

export default connect(mapStateToProps)(WordPractice);
