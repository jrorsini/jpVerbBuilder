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

	props.dispatch(setQuestion(generateQuestion()));

	const keyDownEvenHandler = e => {
		window.location.pathname === '/word-practice' &&
			e.keyCode === 13 &&
			props.dispatch(setQuestion(generateQuestion()));
	};

	document.addEventListener('keydown', keyDownEvenHandler);
	return (
		<div className="container">
			<div>
				<p>{props.flashcard.question && props.flashcard.question.jp}</p>
				<p>{props.flashcard.question && props.flashcard.question.en}</p>
			</div>
			<div>Answer</div>
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordPractice);
