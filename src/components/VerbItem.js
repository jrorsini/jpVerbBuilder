import React from 'react';
import { connect } from 'react-redux';
import { addVerb, removeVerb } from '../actions/verbs';
import { NavLink } from 'react-router-dom';
import { toHiragana } from 'wanakana';

const isEnglish = value => value.match(/[a-z]/gi) !== null;

const VerbItem = props => {
	const listed = () => {
		let isThere = false;
		props.verbs.map(verb => {
			if (verb.kanji === props.verbPreview.word) isThere = true;
		});
		return isThere;
	};
	return (
		<div>
			<div className="VerbItem__header">
				{listed() ? (
					<h2>
						<NavLink
							className="VerbItem__link"
							to={`/word/${props.verbPreview.word}`}
						>
							{props.verbPreview.word} (<span>
								{props.verbPreview.hiragana}
							</span>)
						</NavLink>
					</h2>
				) : (
					<h2>{props.verbPreview.word}</h2>
				)}
				<button
					className={
						listed()
							? 'VerbItem__button button VerbItem__button--listed'
							: 'VerbItem__button button'
					}
					onClick={() => {
						listed(props.verbs, props.verbPreview)
							? props.dispatch(removeVerb(props.verbPreview.word))
							: props.dispatch(
									addVerb({
										id: 1234,
										word: props.verbPreview.word,
										meanings: props.verbPreview.meanings,
										examples: props.verbPreview.examples
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
				{props.verbPreview.meanings.map((meaning, meaningId) => (
					<span key={meaningId}>{meaning} / </span>
				))}
			</p>
			<hr />
			{props.verbPreview.examples.map((example, exampleId) => {
				return (
					<div className="VerbItem__example" key={exampleId}>
						<span className="VerbItem__example--jp">
							{example.original.toLowerCase().split(props.verbPreview.word)[0]}
							<b>{props.verbPreview.word}</b>
							{example.original.toLowerCase().split(props.verbPreview.word)[1]}
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
