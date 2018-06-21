import React from 'react';
import WordList from '../WordList';
import { connect } from 'react-redux';

const List = props => (
	<div className="container">{props.verbs && <WordList />}</div>
);
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(List);
