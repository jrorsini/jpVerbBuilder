import React from 'react';
import { connect } from 'react-redux';

const Video = props => <div className="container">video</div>;

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Video);
