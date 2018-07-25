import React from 'react';
import { connect } from 'react-redux';
import { removeWord } from '../../actions/verbs';

const arr = ['あいうえおいうえおあうえおあ'];
// かきくけこ;
// さしすせそ;
// たちつてと;
// なにぬねの;

const Pronunciation = props => {
	let started = false;
	const start = () => {
		let count = 0;
		started = true;
		const int = setInterval(() => {
			console.log(count);
			count++;
			if (count > 11) {
				console.log('object');
				started = false;
				clearInterval(int);
			}
		}, 500);
	};

	return (
		<div className="container">
			<p>
				Your Pronunciation practice is about to begin, get yourself ready for a
				couple minute then click on the start button
			</p>
			<button
				onClick={() => {
					started = true;
					start();
				}}
			>
				start
			</button>
		</div>
	);
};
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Pronunciation);
