import React from 'react';
import { connect } from 'react-redux';
import { toKatakana } from 'wanakana';
import {
	setHiragana,
	startDrill,
	stopDrill
} from '../../actions/pronunciation';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

// console.log(hiraganaString.length);

const Pronunciation = props => {
	const dispatch = props.dispatch;

	const startDrillOne = () => {
		let iterator = 1;
		dispatch(setHiragana(toKatakana(hiraganaString[0])));
		const int = setInterval(() => {
			dispatch(setHiragana(toKatakana(hiraganaString[iterator])));
			iterator++;
			if (iterator > 125) {
				dispatch(setHiragana(null));
				dispatch(stopDrill());
				clearInterval(int);
			}
		}, 1200);
	};

	const startDrillTwo = () => {
		let iterator = 5;
		dispatch(setHiragana(toKatakana(hiraganaString.slice(0, 5))));
		const int = setInterval(() => {
			dispatch(
				setHiragana(toKatakana(hiraganaString.slice(iterator, iterator + 5)))
			);
			iterator += 5;
			if (iterator > 125) {
				dispatch(setHiragana(null));
				dispatch(stopDrill());
				clearInterval(int);
			}
		}, 1500);
	};

	return (
		<div className="container">
			<h1 className="pronunciation__ttl">
				Your pronunciation practice is about ot begin!
			</h1>
			<p className="pronunciation__txt">
				The first drill is about you repeating outloud the katakana character
				showing up.
			</p>

			{props.pronunciation.started === true ? (
				<div>
					<button
						className="button button--pronunciation"
						onClick={() => {
							dispatch(stopDrill());
						}}
					>
						<p>
							<span>Stop Drill</span>
						</p>
					</button>
					<ReactCSSTransitionGroup
						className={`pronunciation__current ${
							props.pronunciation.current.length > 1
								? 'pronunciation__current--smaller'
								: ''
						}`}
						transitionName="example"
						transitionAppear={true}
						transitionAppearTimeout={200}
						transitionEnter={false}
						transitionLeave={false}
					>
						{props.pronunciation.current.length > 1 ? (
							props.pronunciation.current
								.split('')
								.map((e, i) => <span key={i}>{e}</span>)
						) : (
							<span key="single">{props.pronunciation.current}</span>
						)}
					</ReactCSSTransitionGroup>
				</div>
			) : (
				<div className="pronunciation__drillWrapper">
					<button
						className="button button--pronunciation"
						onClick={() => {
							dispatch(startDrill());
							console.log(props.pronunciation);
							startDrillOne();
						}}
					>
						<p>
							<span>Start Drill 1</span>
						</p>
					</button>
					<button
						className="button button--pronunciation"
						onClick={() => {
							dispatch(startDrill());
							console.log(props.pronunciation);
							startDrillTwo();
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
