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

class ExampleList extends React.Component {
	japaneseTokenizedExample(ex) {
		return ex.map((e, i) => (
			<span
				className={`exampleList__example__kanji ${
					e.surface_form.toLowerCase() ===
					this.props.breadcrumb.current.word.toLowerCase()
						? 'exampleList__example__kanji--highlighted'
						: ''
				}`}
				key={i}
				onClick={() =>
					e.surface_form !== this.props.breadcrumb.current.word &&
					searchHandler(e.surface_form, p)
				}
			>
				{e.surface_form}
			</span>
		));
	}

	englishTokenizedExample(ex) {
		return ex.map((w, i) => (
			<span
				className={`exampleList__example__word ${
					w.toLowerCase() === this.props.breadcrumb.current.word.toLowerCase()
						? 'exampleList__example__word--highlighted'
						: ''
				}`}
				onClick={() =>
					w !== this.props.breadcrumb.current.word && searchHandler(w, p)
				}
				key={i}
			>
				{w.toLowerCase()}
			</span>
		));
	}

	render() {
		return (
			<ul className="exampleList">
				{this.props.breadcrumb.current.examples.map((example, exampleId) => (
					<li className="exampleList__example" key={exampleId}>
						<p className="exampleList__example--original">
							{isEnglish(this.props.breadcrumb.current.word)
								? englishTokenizedExample(example)
								: japaneseTokenizedExample(example)}
							{/* {this.sentenceRenderingHandler(example.original)} */}
						</p>
						<p className="exampleList__example--translated">
							{/* {this.sentenceRenderingHandler(example.translated)} */}
						</p>
					</li>
				))}
			</ul>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ExampleList);
