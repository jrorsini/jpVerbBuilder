import React from 'react';
import { connect } from 'react-redux';

const WordList = props => {
	console.log(props);
	return (
		<ul>{props.verbs.map(verb => <li key={verb.kanji}>{verb.kanji}</li>)}</ul>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordList);
