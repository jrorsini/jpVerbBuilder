import React from 'react';
import { connect } from 'react-redux';
import { addVerb, removeVerb } from '../actions/verbs';
import { NavLink } from 'react-router-dom';

const VerbItem = props => {
	const listed = () => {
		let isThere = false;
		props.verbs.map(verb => {
			if (verb.kanji === props.verbPreview.kanji) isThere = true;
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
							to={`/word/${props.verbPreview.kanji}`}
						>
							{props.verbPreview.kanji} (<span>
								{props.verbPreview.hiragana}
							</span>)
						</NavLink>
					</h2>
				) : (
					<h2>
						{props.verbPreview.kanji} (<span>{props.verbPreview.hiragana}</span>)
					</h2>
				)}
				<button
					className={
						listed()
							? 'VerbItem__button button VerbItem__button--listed'
							: 'VerbItem__button button'
					}
					onClick={() => {
						listed(props.verbs, props.verbPreview)
							? props.dispatch(removeVerb(props.verbPreview.kanji))
							: props.dispatch(
									addVerb({
										id: 1234,
										kanji: props.verbPreview.kanji,
										hiragana: props.verbPreview.hiragana,
										meaning: props.verbPreview.meaning,
										exampleList: props.verbPreview.exampleList
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
			<p>{props.verbPreview.meaning.replace(/\、/g, ', ')}</p>
			<hr />
			{props.verbPreview.exampleList.map((example, exampleId) => {
				return (
					<div className="VerbItem__example" key={exampleId}>
						<span className="VerbItem__example--jp">
							{example.jp.split(props.verbPreview.kanji)[0]}
							<b>{props.verbPreview.kanji}</b>
							{example.jp.split(props.verbPreview.kanji)[1]}
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

export default connect(mapStateToProps)(VerbItem);
