import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setQuestion } from '../../actions/flashcard';

const WordPractice = props => {
	return (
		<div className="container">
			<div className="WordPractice__wrapper">
				{props.flashcard.question && (
					<p className="WordPractice__question">
						<span>{props.flashcard.question.jp[0]}</span>
						<input className="WordPractice__input" />
						<span>{props.flashcard.question.jp[1]}</span>
					</p>
				)}
				<p>{props.flashcard.question && props.flashcard.question.en}</p>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordPractice);
