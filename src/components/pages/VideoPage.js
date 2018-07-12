import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Video = props => {
	console.log(props);
	return <div className="container">episode</div>;
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Video);
