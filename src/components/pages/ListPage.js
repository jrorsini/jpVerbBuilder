import React from 'react';
import WordList from '../WordList';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const List = props => (
	<div className="container">
		{props.words.length > 0 ? (
			<ul>{props.words.map((w, wId) => <li key={wId}>{w.word}</li>)}</ul>
		) : (
			<p className="wordBook__info">
				No words yet! to look for a word go to the{' '}
				<NavLink to="/">search</NavLink>
			</p>
		)}
	</div>
);
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(List);
