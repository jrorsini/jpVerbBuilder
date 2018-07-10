import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeWord } from '../actions/verbs';
import { setQuestion, setAnswer } from '../actions/flashcard';

/**
	This is for the flashcard section, 
	setting it up into the component itself will re add the event hence firing multiple actions.
 */
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

const WordList = props => (
	<div>
		<NavLink
			to="/word-practice"
			onClick={e => {
				const genQA = generateQuestionAnswer(props);
				props.dispatch(setQuestion(genQA.question));
				props.dispatch(setAnswer(genQA.answer));
			}}
		>
			Practice
		</NavLink>
		<ul className="WordList__list">
			{props.verbs.reverse().map(verb => (
				<li className="WordList__item" key={verb.kanji}>
					<NavLink exact className="WordList__link" to={`/word/${verb.kanji}`}>
						{verb.kanji} ({verb.hiragana})
					</NavLink>
					<button
						onClick={e => {
							props.dispatch(removeWord(verb.kanji));
						}}
						className="WordList__button button"
					>
						Remove
					</button>
				</li>
			))}
		</ul>
	</div>
);

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordList);
