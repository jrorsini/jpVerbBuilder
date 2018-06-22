import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setQuestion } from '../../actions/flashcard';

const WordPractice = props => {
	return (
		<div className="container">
			<div className="WordPractice__questions">
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
