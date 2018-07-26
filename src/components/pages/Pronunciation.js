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
	const startDrillOne = () => {
		let iterator = 1;
		started = true;
		props.dispatch(setHiragana(toKatakana(hiraganaString[0])));
		const int = setInterval(() => {
			console.log(hiraganaString[iterator]);
			props.dispatch(setHiragana(toKatakana(hiraganaString[iterator])));
			iterator++;
			if (iterator > 5) {
				console.log('object');
				started = false;
				props.dispatch(setHiragana(null));
				clearInterval(int);
			}
		}, 1200);
	};

	const startDrillTwo = () => {
		let iterator = 1;
		started = true;
		props.dispatch(setHiragana(toKatakana(hiraganaString[0])));
		const int = setInterval(() => {
			console.log(hiraganaString[iterator]);
			props.dispatch(setHiragana(toKatakana(hiraganaString[iterator])));
			iterator += 5;
			if (iterator > 5) {
				console.log('object');
				started = false;
				props.dispatch(setHiragana(null));
				clearInterval(int);
			}
		}, 1200);
	};

	return (
		<div className="container">
			<h1 className="pronunciation__title">
				Your pronunciation practice is about ot begin!
			</h1>
			<p>
				The first drill is about you repeating outloud the katakana character
				showing up.
			</p>

			{props.pronunciation.current ? (
				<p className="pronunciation__current">
					<span> {props.pronunciation.current}</span>
				</p>
			) : (
				<div>
					<button
						className="button button--pronunciation"
						onClick={() => {
							!started && startDrillOne();
							started = true;
						}}
					>
						<p>
							<span>Start Drill 1</span>
						</p>
					</button>
					<button
						className="button button--pronunciation"
						onClick={() => {
							!started && startDrillTwo();
							started = true;
						}}
					>
						<p>
							<span>Start Drill 2</span>
						</p>
					</button>
				</div>
			)}
		</div>
	);
};
const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Pronunciation);
