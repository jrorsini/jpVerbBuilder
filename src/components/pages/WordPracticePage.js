import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setQuestion } from '../../actions/flashcard';

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const WordPractice = props => {
	console.log('object');
	const generateQuestion = () => {
		const wordIndex = getRandomInt(props.verbs.length);
		const exampleIndex = getRandomInt(
			props.verbs[wordIndex].exampleList.length
		);
		return props.verbs[wordIndex].exampleList[exampleIndex];
	};

	return (
		<div className="container">
			<div className="WordPractice">
				<p>{props.flashcard.question && props.flashcard.question.jp}</p>
				<p>{props.flashcard.question && props.flashcard.question.en}</p>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordPractice);
