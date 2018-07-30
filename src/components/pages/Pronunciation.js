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

const Pronunciation = props => {
	const dispatch = props.dispatch;
	const pronunciation = props.pronunciation;

	const ClearAllIntervals = () => {
		for (var i = 1; i < 99999; i++) window.clearInterval(i);
	};

	const startDrillTwo = () => {
		let iterator = 5;
		dispatch(startDrill());
		dispatch(setHiragana(toKatakana(hiraganaString.slice(0, 5))));
		setInterval(() => {
			dispatch(
				setHiragana(toKatakana(hiraganaString.slice(iterator, iterator + 5)))
			);
			console.log(iterator);
			iterator += 5;
			iterator > 125 && stopDrills();
		}, 2000);
	};

	const startDrillOne = () => {
		let iterator = 1;
		dispatch(startDrill());
		dispatch(setHiragana(toKatakana(hiraganaString[0])));
		setInterval(() => {
			dispatch(setHiragana(toKatakana(hiraganaString[iterator])));
			console.log(iterator);
			iterator++;
			iterator > 15 && stopDrills();
		}, 1200);
	};

	const stopDrills = () => {
		dispatch(stopDrill());
		dispatch(setHiragana(null));
		ClearAllIntervals();
	};

	return (
		<div className="container">
			<h1 className="pronunciation__ttl">
				Your pronunciation practice is about ot begin!
			</h1>
			<p className="pronunciation__txt">
				The first drill is about you repeating outloud the katakana character
				showing up. <br />The idea for these drills came from{' '}
				<a
					href="https://www.youtube.com/watch?v=jSIwo5v5vnw"
					className="wordBook__info__link"
					target="_blank"
				>
					this video
				</a>
			</p>

			{pronunciation.started === true ? (
				<div>
					<div className="pronunciation__drillWrapper">
						<button
							className="button button--pronunciation"
							onClick={stopDrills}
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
						onClick={startDrillOne}
					>
						<p>
							<span>First Drill</span>
						</p>
					</button>
					<button
						className="button button--pronunciation"
						onClick={startDrillTwo}
					>
						<p>
							<span>Second Drill</span>
						</p>
					</button>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Pronunciation);
