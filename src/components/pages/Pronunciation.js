import React from 'react';
import { connect } from 'react-redux';

import { removeWord } from '../../actions/verbs';

const Pronunciation = props => {
	const stared = (() => {
		let count = 0;
		const int = setInterval(() => {
			console.log(count);
			count++;
			if (count > 11) {
				console.log('object');
				clearInterval(int);
			}
		}, 500);
	})();

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
