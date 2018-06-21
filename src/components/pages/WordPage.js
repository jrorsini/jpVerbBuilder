import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

/**

 */
const findWord = (wordToFind, wordsList) => {
	let foundWord;
	wordsList.map(word => {
		if (word.kanji === wordToFind) foundWord = word;
	});
	return foundWord;
};

/**
	Search engine looking for verbs.s
 */
const WordPage = props => {
	const word = findWord(props.match.params.word, props.verbs);
	console.log(word);
	return (
		<div className="container">
			<NavLink to="/list">Back to list</NavLink>
			<p>
				{word.kanji}（{word.hiragana}）
			</p>
			<p>{word.meaning.replace(/\、/g, ', ')}</p>
			<hr />
			{word.exampleList.map((example, exampleId) => {
				return (
					<div className="VerbItem__example" key={exampleId}>
						<span className="VerbItem__example--jp">
							{example.jp.split(word.kanji)[0]}
							<b>{word.kanji}</b>
							{example.jp.split(word.kanji)[1]}
						</span>
						<span className="VerbItem__example--en">{example.en}</span>
					</div>
				);
			})}
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordPage);
