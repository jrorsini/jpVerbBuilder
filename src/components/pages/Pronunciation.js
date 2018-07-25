import React from 'react';
import { connect } from 'react-redux';

import { removeWord } from '../../actions/verbs';

let count = 0;
const Pronunciation = props => {
	while (count < 11) {
		setTimeout(() => {
			count++;
			console.log(count);
		}, 1000);
	}
	return (
		<div className="container">
			<p>Pronunciation</p>
		</div>
	);
};
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Pronunciation);
