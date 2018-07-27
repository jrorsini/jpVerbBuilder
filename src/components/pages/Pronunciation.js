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

const ClearAllIntervals = () => {
	for (var i = 1; i < 99999; i++) window.clearInterval(i);
};

const Pronunciation = props => {
	const dispatch = props.dispatch;
	const pronunciation = props.pronunciation;

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
		}, 2000);
	};

	const drillOneHandler = () => {
		let iterator = 1;
		dispatch(setHiragana(toKatakana(hiraganaString[iterator])));
		console.log(iterator);
		iterator++;
		if (iterator > 125) {
			dispatch(setHiragana(null));
			dispatch(stopDrill());
		}
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

			{pronunciation.started === true ? (
				<div>
					<div className="pronunciation__drillWrapper">
						<button
							className="button button--pronunciation"
							onClick={() => {
								dispatch(stopDrill());
								dispatch(setHiragana(null));
								ClearAllIntervals();
							}}
						>
							<p>
								<span>Stop Drill</span>
							</p>
						</button>
					</div>
					<ReactCSSTransitionGroup
						className={`pronunciation__current ${
							pronunciation.current.length > 1
								? 'pronunciation__current--smaller'
								: ''
						}`}
						transitionName="example"
						transitionAppear={true}
						transitionAppearTimeout={200}
						transitionEnter={false}
						transitionLeave={false}
					>
						{pronunciation.current.length > 1 ? (
							pronunciation.current
								.split('')
								.map((e, i) => <span key={i}>{e}</span>)
						) : (
							<span>{pronunciation.current}</span>
						)}
					</ReactCSSTransitionGroup>
				</div>
			) : (
				<div className="pronunciation__drillWrapper">
					<button
						className="button button--pronunciation"
						onClick={() => {
							dispatch(startDrill());
							dispatch(setHiragana(toKatakana(hiraganaString[0])));
							let iterator = 1;
							const drillOneInterval = setInterval(() => {
								dispatch(setHiragana(toKatakana(hiraganaString[iterator])));
								console.log(iterator);
								iterator++;
								if (iterator > 2) {
									dispatch(stopDrill());
									dispatch(setHiragana(null));
									ClearAllIntervals();
								}
							}, 1200);
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
