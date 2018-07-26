import React from 'react';
import { connect } from 'react-redux';
import { toKatakana } from 'wanakana';
import { setHiragana } from '../../actions/pronunciation';

const hira = 'あいうえおいうえおあうえおあいえおあいうおあいうえ';
const hirK = 'かきくけこきくけこかくけこかきけこかきくこかきくけ';
const hirS = 'さしすせそしすせそさすせそさしせそさしすそさしすせ';
const hirT = 'たちつてとちつてとたつてとたちてとたちつとたちつて';
const hirN = 'なにぬねのにぬねのなぬねのなにねのなにぬのなにぬね';
const hirH = 'はひふへほひふへほはふへほはひへほはひふほはひふへ';
const hirM = 'まみむめもみむめもまむめもまみめもまみむもまみむめ';
const hirY = 'やいゆえよいゆえよやゆえよやいえよやいゆよやいゆえ';
const hirR = 'らりるれろりるれろらるれろらりれろらりるろらりるれ';
const hirW = 'わいうえおいうえおわうえおわいえおわいうおわいうえ';
const hirG = 'がぎぐげごぎぐげごがぐげごがぎげごがぎぐごがぎぐげ';
const hirZ = 'ざジずぜぞジずぜぞざずぜぞざジぜぞざジずぞざジずぜ';
const hirD = 'だぢづでどぢづでどだづでどだぢでどだぢづどだぢづで';
const hirB = 'ばびぶべぼびぶべぼばぶべぼばびべぼばびぶぼばびぶべ';
const hirP = 'ぱぴぷぺぽぴぷぺぽぱぷぺぽぱぴぺぽぱぴぷぽぱぴぷぺ';

const hiraganaString =
	hira +
	hirK +
	hirS +
	hirT +
	hirN +
	hirH +
	hirM +
	hirY +
	hirR +
	hirW +
	hirG +
	hirZ +
	hirD +
	hirB +
	hirP;
console.log(hiraganaString.length);

const Pronunciation = props => {
	let started = false;
	const start = () => {
		let iterator = 0;
		started = true;
		const int = setInterval(() => {
			console.log(hiraganaString[iterator]);
			props.dispatch(setHiragana(toKatakana(hiraganaString[iterator])));
			iterator++;
			if (iterator > 125) {
				console.log('object');
				started = false;
				clearInterval(int);
			}
		}, 1200);
	};

	return (
		<div className="container">
			<p>
				Your Pronunciation practice is about to begin, get yourself ready for a
				couple minute then click on the start button
			</p>
			<button
				className="button"
				onClick={() => {
					!started && start();
					started = true;
				}}
			>
				<p>
					<span>start</span>
				</p>
			</button>
			{props.pronunciation.current ? (
				<p>{props.pronunciation.current}</p>
			) : (
				<p>ア</p>
			)}
		</div>
	);
};
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Pronunciation);
