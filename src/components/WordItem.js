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
import { tokenize } from 'kuromojin';

// FUNCTIONS
const listed = props => {
	let isThere = false;
	props.words.map(w => {
		if (w.word === props.word.word) isThere = true;
		return w;
	});
	return isThere;
};

// COMPONENT
const WordItem = props => {
	const word = props.word;

	word.word !== null &&
		!isEnglish(word.word) &&
		word.reading === null &&
		tokenize(word.word).then(res => {
			let reading = '';
			res.map(e => {
				reading += toHiragana(e.reading);
			});
			props.dispatch(setCurrentPanel({ ...word, reading }));
		});

	const wordPreviewHeaderContent = (
		<div>
			{props.page === 'search' && (
				<i
					className="material-icons WordItem__bookmark"
					onClick={() => {
						listed(props)
							? props.dispatch(removeWord(word.word))
							: props.dispatch(
									addWord({
										...word
									})
							  );
					}}
				>
					{listed(props) ? 'bookmark' : 'bookmark_border'}
				</i>
			)}
			{listed(props) ? (
				<NavLink className="WordItem__link" to={`/word/${word.word}`}>
					{capString(word.word)}
				</NavLink>
			) : (
				capString(word.word)
			)}{' '}
			{word.reading && <span>{word.reading}</span>}
		</div>
	);

	return (
		<div>
			<div className="WordItem__header">
				<h2>{wordPreviewHeaderContent}</h2>
				{props.page === 'search' && (
					<button
						className={
							listed(props)
								? 'WordItem__button button WordItem__button--listed'
								: 'WordItem__button button'
						}
						onClick={() => {
							listed(props)
								? props.dispatch(removeWord(word.word))
								: props.dispatch(
										addWord({
											...word
										})
								  );
						}}
					>
						<span>
							{listed(props) ? (
								<i className="material-icons">delete</i>
							) : (
								<i className="material-icons">add</i>
							)}
							{listed(props) ? 'Remove from WordBook' : 'Add to WordBook'}
						</span>
					</button>
				)}
			</div>
			<ul className="WordItem__meanings">
				{word.meanings.map((meaning, meaningId) => (
					<li key={meaningId}>
						{meaning.split(', ').map((e, i) => (
							<div key={i}>
								{i !== 0 && ','}
								<span
									onClick={() => {
										searchHandler(e, props);
									}}
								>
									{capString(e)}
								</span>
							</div>
						))}
						{meaningId + 1 < word.meanings.length && <b>-</b>}
					</li>
				))}
			</ul>
			<hr />
			{word.examples.length > 0 ? (
				<WordExamplesList word={word} />
			) : (
				<p>No examples found for this word...</p>
			)}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(WordItem);
