import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

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
const WordPage = props => {
	const word = findWord(props.match.params.word, props.words);
	return (
		<div className="container">
			<NavLink to="/list">Back to list</NavLink>
			<p>
				{word.word} {word.reading}
			</p>
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordPage);
