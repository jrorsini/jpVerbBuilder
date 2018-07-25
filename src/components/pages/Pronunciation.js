import React from 'react';
import { connect } from 'react-redux';

import { removeWord } from '../../actions/verbs';

const Pronunciation = props => (
	<div className="container">
		<p>Pronunciation</p>
	</div>
);
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Pronunciation);
