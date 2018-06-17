import React from 'react';
import { connect } from 'react-redux';
import { addVerb, removeVerb } from '../actions/verbs';

const VerbItem = props => {
	console.log(props);
	return (
		<div>
			<div className="VerbItem__header">
				<h2>
					{props.verbPreview.kanji} (<span>{props.verbPreview.hiragana}</span>)
				</h2>
				<button
					className="VerbItem__button button"
					onClick={() => {
						props.dispatch(
							addVerb({
								id: 1234,
								kanji: props.verbPreview.kanji,
								hiragana: props.verbPreview.hiragana,
								meaning: props.verbPreview.meaning,
								exampleList: props.verbPreview.exampleList
							})
						);
					}}
				>
					Add to word's list
				</button>
			</div>
			<p>{props.verbPreview.meaning.replace(/\、/g, ', ')}</p>
			<hr />
			{props.verbPreview.exampleList.map((example, exampleId) => {
				return (
					<div className="VerbItem__example" key={exampleId}>
						<span className="VerbItem__example--jp">
							{example.jp.split(props.verbPreview.kanji)[0]}
							<b>{props.verbPreview.kanji}</b>
							{example.jp.split(props.verbPreview.kanji)[1]}
						</span>
						<span className="VerbItem__example--en">{example.en}</span>
					</div>
				);
			})}
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(VerbItem);
