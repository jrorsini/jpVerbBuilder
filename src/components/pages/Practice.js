import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Practice = props => {
	return (
		<div>
			<NavLink to="/practice/pronunciation">Pronunciation</NavLink>
		</div>
	);
};
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Practice);
