// REACT
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// ACTIONS
import { addWord, removeWord } from '../actions/verbs';

// SUB-COMPONENT
import ExampleList from '../components/WordItem/exampleList';

// UTILITIES
import { toHiragana } from 'wanakana';
import { searchHandler } from '../utilities/search_handler';

// FUNCTIONS
const isEnglish = txt => txt.match(/[^a-z/\s/\.\[\]\,\-]/gi) === null;

const listed = props => {
	let isThere = false;
	props.words.map(w => {
		if (w.word === props.breadcrumb.current.word) isThere = true;
		return w;
	});
	return isThere;
};

// COMPONENT
const VerbItem = props => {
	const wordPreviewHeaderContent = (
		<div>
			<i className="material-icons">
				{listed(props) ? 'bookmark' : 'bookmark_border'}
			</i>
			{listed(props) ? (
				<NavLink
					className="WordItem__link"
					to={`/word/${props.breadcrumb.current.word}`}
				>
					{props.breadcrumb.current.word}
				</NavLink>
			) : (
				props.breadcrumb.current.word
			)}{' '}
			{props.breadcrumb.current.reading && (
				<span>{props.breadcrumb.current.reading}</span>
			)}
		</div>
	);

	return (
		<div>
			<div className="WordItem__header">
				<h2>{wordPreviewHeaderContent}</h2>
				<button
					className={
						listed(props)
							? 'WordItem__button button WordItem__button--listed'
							: 'WordItem__button button'
					}
					onClick={() => {
						listed(props)
							? props.dispatch(removeWord(props.breadcrumb.current.word))
							: props.dispatch(
									addWord({
										...props.breadcrumb.current
									})
							  );
					}}
				>
					{listed(props) ? (
						<i className="material-icons">delete</i>
					) : (
						<i className="material-icons">add</i>
					)}
					{listed(props) ? 'Remove from WordBook' : 'Add to WordBook'}
				</button>
			</div>
			<ul className="WordItem__meanings">
				{props.breadcrumb.current.meanings.map((meaning, meaningId) => (
					<li key={meaningId}>
						{meaning.split(', ').map((e, i) => (
							<div key={i}>
								{i !== 0 && ','}
								<span
									onClick={() => {
										searchHandler(e, props);
									}}
								>
									{e}
								</span>
							</div>
						))}
						{meaningId + 1 < props.breadcrumb.current.meanings.length && (
							<b>-</b>
						)}
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
