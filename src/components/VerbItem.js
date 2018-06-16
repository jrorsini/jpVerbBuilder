import React from 'react';
import { connect } from 'react-redux';
import { addVerb, removeVerb } from '../actions/verbs';

const VerbItem = props => {
	console.log(props);
	return (
		<div>
			<h2 className="VerbItem__header">
				{props.verbPreview.kanji} (<span>{props.verbPreview.hiragana}</span>)
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
			</h2>
			<p>{props.verbPreview.meaning.replace(/\、/g, ', ')}</p>
			{props.verbPreview.exampleList.map((example, exampleId) => {
				return (
					<div key={exampleId}>
						<p>{example.jp}</p>
						<p>{example.en}</p>
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
