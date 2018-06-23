import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toHiragana } from 'wanakana';

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
