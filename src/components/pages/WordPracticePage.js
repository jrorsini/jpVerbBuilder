import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toHiragana } from 'wanakana';

const WordPractice = props => {
	return (
		<div className="container">
			<div className="WordPractice__wrapper">
				{props.flashcard.question && (
					<p className="WordPractice__question">
						<span>{props.flashcard.question.jp[0]}</span>
						<input
							type="text"
							name="answerInput"
							id="answerInput"
							className="WordPractice__input"
							onKeyUp={e => {
								e.target.value = toHiragana(e.target.value);
							}}
						/>
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
