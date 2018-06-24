import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toHiragana } from 'wanakana';
import { setQuestion, setAnswer } from '../../actions/flashcard';

const generateQuestionAnswer = props => {
	const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
	const wordIndex = getRandomInt(props.verbs.length);
	const exampleIndex = getRandomInt(props.verbs[wordIndex].exampleList.length);
	const obj = props.verbs[wordIndex];
	const qObj = obj.exampleList[exampleIndex];
	return {
		question: {
			jp: qObj.jp.split(obj.kanji),
			en: qObj.en
		},
		answer: obj.kanji
	};
};

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
							autoComplete="off"
							className="WordPractice__input"
							onKeyUp={e => {
								e.target.value = toHiragana(e.target.value);
							}}
						/>
						<span>{props.flashcard.question.jp[1]}</span>
					</p>
				)}
				<p>{props.flashcard.question && props.flashcard.question.en}</p>

				<p>{props.flashcard.answer && props.flashcard.answer}</p>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordPractice);
