import React from 'react';
import WordList from '../WordList';
import { connect } from 'react-redux';

const List = props => (
	<div className="container">
		{props.words && <ul>{props.words.map(w => <li>{w.word}</li>)}</ul>}
	</div>
);
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(List);
