// REACT
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// ACTIONS
import { extendPanel, setCurrentPanel } from '../actions/breadcrumb';
import { addWord, removeWord } from '../actions/verbs';
import { setPreview } from '../actions/wordPreview';
import { setErrorTxt } from '../actions/errorMessage';

// SUB-COMPONENT
import ExampleList from '../components/WordItem/exampleList';

// UTILITIES
import { toHiragana } from 'wanakana';
import search from '../logic/search_handler';

// FUNCTIONS
const isEnglish = value => value.match(/[a-z]/gi) !== null;

const listed = props => {
	let isThere = false;
	props.words.map(w => {
		if (w.word === props.wordPreview.word) isThere = true;
		return w;
	});
	return isThere;
};

const searchHandler = (e, props) => {
	search(e)
		.then(res => {
			props.dispatch(
				setPreview({
					...JSON.parse(res)
				})
			);
			props.dispatch(setErrorTxt(null));

			props.dispatch(extendPanel(e));
			props.dispatch(setCurrentPanel(e));
		})
		.catch(err => props.dispatch(setErrorTxt(err)));
};

// COMPONENT
const VerbItem = props => {
	const wordPreviewHeaderContent = (
		<div>
			{props.wordPreview.word}{' '}
			{props.wordPreview.reading && <span>{props.wordPreview.reading}</span>}
		</div>
	);

	return (
		<div>
			<div className="WordItem__header">
				{listed(props) ? (
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
						listed(props)
							? 'WordItem__button button WordItem__button--listed'
							: 'WordItem__button button'
					}
					onClick={() => {
						listed(props)
							? props.dispatch(removeWord(props.wordPreview.word))
							: props.dispatch(
									addWord({
										...props.wordPreview
									})
							  );
					}}
				>
					{listed(props) ? (
						<i className="material-icons">delete</i>
					) : (
						<i className="material-icons">save</i>
					)}
					{listed(props) ? "Remove from word's list" : "Add to word's list"}
				</button>
			</div>
			<ul className="WordItem__meanings">
				{props.wordPreview.meanings.map((meaning, meaningId) => (
					<li key={meaningId}>
						{meaning.split(', ').map((e, i) => (
							<div>
								{i !== 0 && ','}
								<span
									key={i}
									onClick={() => {
										searchHandler(e, props);
									}}
								>
									{e}
								</span>
							</div>
						))}

						{meaningId + 1 < props.wordPreview.meanings.length && <b>-</b>}
					</li>
				))}
			</ul>
			<hr />
			<ExampleList />
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(VerbItem);

/*
*/
