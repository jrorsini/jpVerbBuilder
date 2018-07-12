import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const odArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const Video = props => (
	<div className="container">
		<ul>
			{odArr.map(e => (
				<li>
					<NavLink to={`/video/${e}`}>Episode {e}</NavLink>
				</li>
			))}
		</ul>
	</div>
);

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Video);
