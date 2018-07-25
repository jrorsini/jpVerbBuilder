import React from 'react';
import { connect } from 'react-redux';
import { toKatakana } from 'wanakana';
import { setHiragana } from '../../actions/pronunciation';

const hiraganaString =
	'あいうえおいうえおあうえおあいえおあいうおあいうえ-かきくけこ-きくけこか-くけこかき-けこかきく-こかきくけ';
// かきくけこ;
// さしすせそ;
// たちつてと;
// なにぬねの;

const Pronunciation = props => {
	let started = false;
	const start = () => {
		let iterator = 0;
		started = true;
		const int = setInterval(() => {
			console.log(hiraganaString[iterator]);
			props.dispatch(setHiragana(toKatakana(hiraganaString[iterator])));
			iterator++;
			if (iterator > 25) {
				console.log('object');
				started = false;
				clearInterval(int);
			}
		}, 1000);
	};

	return (
		<div className="container">
			<p>
				Your Pronunciation practice is about to begin, get yourself ready for a
				couple minute then click on the start button
			</p>
			<button
				onClick={() => {
					!started && start();
					started = true;
				}}
			>
				start
			</button>
			{props.pronunciation.current ? (
				<p>{props.pronunciation.current}</p>
			) : (
				<p>あ</p>
			)}
		</div>
	);
};
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Pronunciation);
