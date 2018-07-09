import React from 'react';
import { connect } from 'react-redux';
import { addVerb, removeVerb } from '../actions/verbs';
import { NavLink } from 'react-router-dom';
import { toHiragana } from 'wanakana';

const isEnglish = value => value.match(/[a-z]/gi) !== null;

const VerbItem = props => {
	const listed = () => {
		let isThere = false;
		props.words &&
			props.words.map(verb => {
				if (word.word === props.wordPreview.word) isThere = true;
			});
		return isThere;
	};

	const wordPreviewHeaderContent = (
		<div>
			{props.wordPreview.word}{' '}
			{props.wordPreview.reading && <span>({props.wordPreview.reading})</span>}
		</div>
	);
	return (
		<div>
			<div className="VerbItem__header">
				{listed() ? (
					<h2>
						<NavLink
							className="VerbItem__link"
							to={`/word/${props.wordPreview.word}`}
						>
							{wordPreviewHeaderContent}
						</NavLink>
					</h2>
				) : (
					<h2>{wordPreviewHeaderContent}</h2>
				)}
				<button
					className={
						listed()
							? 'VerbItem__button button VerbItem__button--listed'
							: 'VerbItem__button button'
					}
					onClick={() => {
						listed(props.verbs, props.wordPreview)
							? props.dispatch(removeVerb(props.wordPreview.word))
							: props.dispatch(
									addVerb({
										id: 1234,
										word: props.wordPreview.word,
										reading: props.wordPreview.reading,
										meanings: props.wordPreview.meanings,
										examples: props.wordPreview.examples
									})
							  );
					}}
				>
					{listed() ? (
						<i className="material-icons">delete</i>
					) : (
						<i className="material-icons">save</i>
					)}
					{listed() ? "Remove from word's list" : "Add to word's list"}
				</button>
			</div>
			<p>
				{props.wordPreview.meanings.map((meaning, meaningId) => (
					<span key={meaningId}>{meaning} | </span>
				))}
			</p>
			<hr />
			{props.wordPreview.examples.map((example, exampleId) => {
				return (
					<div className="VerbItem__example" key={exampleId}>
						<span className="VerbItem__example--jp">
							{example.original.toLowerCase().split(props.wordPreview.word)[0]}
							<b>{props.wordPreview.word}</b>
							{example.original.toLowerCase().split(props.wordPreview.word)[1]}
						</span>
						<span className="VerbItem__example--en">{example.translated}</span>
					</div>
				);
			})}
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(VerbItem);
