import React from 'react';
import { connect } from 'react-redux';
import { addVerb, removeVerb } from '../actions/verbs';

const VerbItem = props => {
	console.log(props);
	const listed = (list, preview) => {
		let isThere = false;
		list.map(verb => {
			if (verb.kanji === preview.kanji) isThere = true;
		});
		return isThere;
	};
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
					{listed(props.verbs, props.verbPreview)
						? "Remove from word's list"
						: "Add to word's list"}
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
