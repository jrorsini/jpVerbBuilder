// REACT
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { setCurrentPanel } from '../../actions/breadcrumb';

import { isKatakana } from 'wanakana';

// UTILITIES
import { searchHandler } from '../../utilities/search_handler';
import {
	isEnglish,
	engTokenize,
	capString
} from '../../utilities/eng_tokenizer';

import { tokenize } from 'kuromojin';

const ExampleList = props => {
	const word = props.word;
	const englishTokenizedExample = ex =>
		ex.map((w, i) => (
			<span
				className={`exampleList__example__word ${
					w.toLowerCase() === word.word.toLowerCase()
						? 'exampleList__example__word--highlighted'
						: ''
				}`}
				onClick={() => w !== word.word && searchHandler(w, props)}
				key={i}
			>
				{w.toLowerCase()}
			</span>
		));

	const japaneseTokenizedExample = ex =>
		ex.map((e, i) => (
			<span
				className={`exampleList__example__jap ${
					e.surface_form.toLowerCase() === word.word.toLowerCase()
						? 'exampleList__example__word--highlighted'
						: ''
				} ${
					isKatakana(e.surface_form)
						? 'exampleList__example__word--katakana'
						: ''
				}`}
				key={i}
				onClick={() =>
					e.surface_form !== word.word && searchHandler(e.surface_form, props)
				}
			>
				{e.surface_form}
			</span>
		));

	return (
		<ul className="exampleList">
			{word.examples.map((example, exampleId) => (
				<li className="exampleList__example" key={exampleId}>
					<p className="exampleList__example--original">
						{isEnglish(word.word)
							? englishTokenizedExample(example.original)
							: japaneseTokenizedExample(example.original)}
					</p>
					<p className="exampleList__example--translated">
						{!isEnglish(word.word)
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
