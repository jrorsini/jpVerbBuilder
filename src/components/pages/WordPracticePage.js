import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const test = true;

const keyDownEvenHandler = e => {
	e.keyCode === 13 && test && console.log('yo yo');
};

const WordPractice = props => {
	return (
		<div className="container" keydown={keyDownEvenHandler(event)}>
			<div>Question</div>
			<div>Answer</div>
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordPractice);
