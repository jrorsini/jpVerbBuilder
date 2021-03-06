import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import WordItem from '../WordItem';

const findWord = (wordToFind, wordsList) => {
	let foundWord;
	wordsList.map(word => {
		if (word.word === wordToFind) foundWord = word;
	});
	return foundWord;
};

/**
	Search engine looking for verbs.s
 */
const WordDetails = props => {
	const word = findWord(props.match.params.word, props.words);
	return (
		<div className="container">
			<NavLink to="/wordbook">Back to list</NavLink>
			<WordItem word={word} page="word" />
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordDetails);
