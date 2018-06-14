import React from 'react';
import { connect } from 'react-redux';
import { addVerb, removeVerb } from '../actions/verbs';

const VerbItem = ({ kanji, hiragana, meaning, exampleList }) => {
	console.log(props);
	return (
		<div>
			<h2>
				{kanji} (<span>{hiragana}</span>)
				<button
					onClick={() => {
						dispatch(
							addVerb({
								id: 1234,
								kanji,
								hiragana,
								meaning,
								exampleList
							})
						);
						console.log('added');
					}}
				>
					Add
				</button>
			</h2>
			<p>{meaning.replace(/\、/g, ', ')}</p>
			{exampleList.map((example, exampleId) => {
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
