import React from 'react';
import { connect } from 'react-redux';

const WordList = props => {
	console.log(props);
	return (
		<ul>
			<li>test</li>
			<li>test</li>
			<li>test</li>
			<li>test</li>
		</ul>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect()(WordList);
