// REACT
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// ACTIONS
import { addWord, removeWord } from '../actions/verbs';
import { setPreview } from '../actions/wordPreview';
import { setErrorTxt } from '../actions/errorMessage';
// UTILITIES
import { toHiragana } from 'wanakana';
import search from '../logic/search_handler';

const isEnglish = value => value.match(/[a-z]/gi) !== null;

const VerbItem = props => {
	console.log(props.breadcrumb);
	const listed = () => {
		let isThere = false;
		props.words.map(w => {
			if (w.word === props.wordPreview.word) isThere = true;
			return w;
		});
		return isThere;
	};
	const wordPreviewHeaderContent = (
		<div>
			{props.wordPreview.word}{' '}
			{props.wordPreview.reading && <span>{props.wordPreview.reading}</span>}
		</div>
	);
	return (
		<div>
			<div className="WordItem__header">
				{listed() ? (
					<h2>
						<NavLink
							className="WordItem__link"
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
							? 'WordItem__button button WordItem__button--listed'
							: 'WordItem__button button'
					}
					onClick={() => {
						listed(props.verbs, props.wordPreview)
							? props.dispatch(removeWord(props.wordPreview.word))
							: props.dispatch(
									addWord({
										...props.wordPreview
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
			<ul className="WordItem__meanings">
				{props.wordPreview.meanings.map((meaning, meaningId) => (
					<li key={meaningId}>
						<span
							onClick={() => {
								console.log(meaning);
								search(meaning)
									.then(res => {
										props.dispatch(
											setPreview({
												...JSON.parse(res)
											})
										);
										props.dispatch(setErrorTxt(null));
									})
									.catch(err => props.dispatch(setErrorTxt(err)));
							}}
						>
							{meaning}
						</span>
						{meaningId + 1 < props.wordPreview.meanings.length && <b>-</b>}
					</li>
				))}
			</ul>
			<hr />
			{props.wordPreview.examples.map((example, exampleId) => {
				return (
					<div className="WordItem__example" key={exampleId}>
						<span className="WordItem__example--original">
							{example.original.toLowerCase().split(props.wordPreview.word)[0]}
							<b>{props.wordPreview.word}</b>
							{example.original.toLowerCase().split(props.wordPreview.word)[1]}
						</span>
						<span className="WordItem__example--translated">
							{example.translated}
						</span>
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

/*
*/
