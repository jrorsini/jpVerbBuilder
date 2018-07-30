import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeWord } from '../../actions/words';

const WordBook = props => (
	<div className="container">
		{props.words.length > 0 ? (
			<ul>
				{props.words.map((w, wId) => (
					<li key={wId} className="WordList__item">
						<p>
							<NavLink exact className="WordList__link" to={`/word/${w.word}`}>
								{w.word}
							</NavLink>
							{w.reading && <b> - {w.reading}</b>} -{' '}
							{w.meanings[0].split(', ')[0]}
						</p>
						<button
							className="WordList__button button"
							onClick={() => props.dispatch(removeWord(w.word))}
						>
							<p>
								<i className="material-icons">delete</i>
								<span>Delete</span>
							</p>
						</button>
					</li>
				))}
			</ul>
		) : (
			<p className="wordBook__info">
				No words in your bookmark. To look for a word go to the{' '}
				<NavLink to="/search" className="wordBook__info__link">
					search
				</NavLink>
			</p>
		)}
	</div>
);
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordBook);
