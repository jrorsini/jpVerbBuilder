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
					Add
				</button>
			</div>
			<p>{props.verbPreview.meaning.replace(/\、/g, ', ')}</p>
			<hr />
			{props.verbPreview.exampleList.map((example, exampleId) => {
				return (
					<div className="VerbItem__example" key={exampleId}>
						<span>{example.jp}</span>
						<span>{example.en}</span>
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
