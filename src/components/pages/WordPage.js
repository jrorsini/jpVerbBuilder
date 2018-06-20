import React from 'react';
import { connect } from 'react-redux';

/**
	Search engine looking for verbs.s
 */
const WordPage = props => {
	return <div className="container">Test</div>;
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(SearchPage);
