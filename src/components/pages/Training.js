import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Training = props => {
	return (
		<div className="container">
			<button className="button WordItem__button">
				<NavLink to="/practice/pronunciation">
					<span>Pronunciation</span>
				</NavLink>
			</button>
		</div>
	);
};
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Training);
