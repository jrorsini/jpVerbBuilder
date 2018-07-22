import React from 'react';
import WordList from '../WordList';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { removeWord } from '../../actions/verbs';

const List = props => (
	<div className="container">
		{props.words.length > 0 ? (
			<ul>
				{props.words.map((w, wId) => (
					<li key={wId}>
						{w.word}{' '}
						<button onClick={() => props.dispatch(removeWord(w.word))}>
							remove
						</button>
					</li>
				))}
			</ul>
		) : (
			<p className="wordBook__info">
				No words in your bookmark. To look for a word go to the{' '}
				<NavLink to="/" className="wordBook__info__link">
					search
				</NavLink>
			</p>
		)}
	</div>
);
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(List);
