import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const WordPractice = props => {
	console.log(props);

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
			generateAnswer();
	};

	document.addEventListener('keydown', keyDownEvenHandler);
	return (
		<div className="container">
			<div>Question</div>
			<div>Answer</div>
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordPractice);
