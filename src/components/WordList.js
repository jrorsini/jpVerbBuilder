import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeVerb } from '../actions/verbs';

/**
	This is for the flashcard section, 
	setting it up into the component itself will re add the event hence firing multiple actions.
 */
const generateQuestionAnswer = () => {
	const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));
	const wordIndex = getRandomInt(store.getState().verbs.length);
	const exampleIndex = getRandomInt(
		store.getState().verbs[wordIndex].exampleList.length
	);
	const obj = store.getState().verbs[wordIndex];
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
				console.log(e);
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
							props.dispatch(removeVerb(verb.kanji));
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
