import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

/**
	Search engine looking for verbs.s
 */
const WordPage = props => {
	return (
		<div className="container">
			<NavLink to="/list">Back to list</NavLink>
			Test
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordPage);
