// REACT
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// ACTIONS
import { addWord, removeWord } from '../actions/verbs';
import { setCurrentPanel } from '../actions/breadcrumb';

// SUB-COMPONENT
import WordExamplesList from '../components/WordItem/WordExamplesList';

// UTILITIES
import { toHiragana } from 'wanakana';
import { isEnglish, engTokenize, capString } from '../utilities/eng_tokenizer';
import { searchHandler } from '../utilities/search_handler';
import { tokenize, getTokenizer } from 'kuromojin';

getTokenizer({ dicPath: '/dict' });

// FUNCTIONS
const listed = props => {
	let isThere = false;
	props.words.map(w => {
		if (w.word === props.breadcrumb.current.word) isThere = true;
		return w;
	});
	return isThere;
};

// COMPONENT
const WordItem = props => {
	props.breadcrumb.current.word !== null &&
		!isEnglish(props.breadcrumb.current.word) &&
		props.breadcrumb.current.reading === null &&
		tokenize(props.breadcrumb.current.word).then(res => {
			let reading = '';
			res.map(e => {
				reading += toHiragana(e.reading);
			});
			props.dispatch(setCurrentPanel({ ...props.breadcrumb.current, reading }));
		});

	const wordPreviewHeaderContent = (
		<div>
			<i
				className="material-icons WordItem__bookmark"
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
				{listed(props) ? 'bookmark' : 'bookmark_border'}
			</i>
			{listed(props) ? (
				<NavLink
					className="WordItem__link"
					to={`/word/${props.breadcrumb.current.word}`}
				>
					{capString(props.breadcrumb.current.word)}
				</NavLink>
			) : (
				capString(props.breadcrumb.current.word)
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
			<WordExamplesList />
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(WordItem);

/*
*/
