// REACT
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { setCurrentPanel } from '../../actions/breadcrumb';

// UTILITIES
import { searchHandler } from '../../utilities/search_handler';
import {
	isEnglish,
	engTokenize,
	capString
} from '../../utilities/eng_tokenizer';

import { tokenize } from 'kuromojin';

const ExampleList = props => {
	const englishTokenizedExample = ex =>
		ex.map((w, i) => (
			<span
				className={`exampleList__example__word ${
					w.toLowerCase() === props.breadcrumb.current.word.toLowerCase()
						? 'exampleList__example__word--highlighted'
						: ''
				}`}
				onClick={() =>
					w !== props.breadcrumb.current.word && searchHandler(w, props)
				}
				key={i}
			>
				{w.toLowerCase()}
			</span>
		));

	const japaneseTokenizedExample = ex =>
		ex.map((e, i) => (
			<span
				className={`exampleList__example__kanji ${
					e.surface_form.toLowerCase() ===
					props.breadcrumb.current.word.toLowerCase()
						? 'exampleList__example__kanji--highlighted'
						: ''
				}`}
				key={i}
				onClick={() =>
					e.surface_form !== props.breadcrumb.current.word &&
					searchHandler(e.surface_form, props)
				}
			>
				{e.surface_form}
			</span>
		));

	return (
		<ul className="exampleList">
			{props.breadcrumb.current.examples.map((example, exampleId) => (
				<li className="exampleList__example" key={exampleId}>
					<p className="exampleList__example--original">
						{isEnglish(props.breadcrumb.current.word)
							? englishTokenizedExample(example.original)
							: japaneseTokenizedExample(example.original)}
					</p>
					<p className="exampleList__example--translated">
						{!isEnglish(props.breadcrumb.current.word)
							? englishTokenizedExample(example.translated)
							: japaneseTokenizedExample(example.translated)}
					</p>
				</li>
			))}
		</ul>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ExampleList);
