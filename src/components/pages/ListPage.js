import React from 'react';
import WordList from '../WordList';
import { connect } from 'react-redux';

const List = props => (
	<div className="container">
		{props.words.length > 0 ? (
			<ul>{props.words.map((w, wId) => <li key={wId}>{w.word}</li>)}</ul>
		) : (
			<p className="wordBook__info">No words yet!</p>
		)}
	</div>
);
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(List);
