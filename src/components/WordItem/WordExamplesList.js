// REACT
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { setCurrentPanel } from '../../actions/breadcrumb';

// UTILITIES
import { searchHandler } from '../../utilities/search_handler';
import { isEnglish, engTokenize } from '../../utilities/eng_tokenizer';
import { capString } from '../../utilities/eng_tokenizer';

import { tokenize } from 'kuromojin';

class ExampleList extends React.Component {
	sentenceRenderingHandler(ex = ex.replace(/\./, '')) {
		const p = this.props;
		return typeof ex === 'string' && isEnglish(ex)
			? engTokenize(ex)
					.split(/\s/gi)
					.map((w, i) => (
						<span
							className={`exampleList__example__word ${
								w.toLowerCase() === p.breadcrumb.current.word.toLowerCase()
									? 'exampleList__example__word--highlighted'
									: ''
							}`}
							onClick={() =>
								w !== p.breadcrumb.current.word && searchHandler(w, p)
							}
							key={i}
						>
							{w.toLowerCase()}
						</span>
					))
			: typeof ex !== 'string'
				? ex.map((e, i) => (
						<span
							className={`exampleList__example__kanji ${
								e.surface_form.toLowerCase() ===
								p.breadcrumb.current.word.toLowerCase()
									? 'exampleList__example__kanji--highlighted'
									: ''
							}`}
							key={i}
							onClick={() =>
								e.surface_form !== p.breadcrumb.current.word &&
								searchHandler(e.surface_form, p)
							}
						>
							{e.surface_form}
						</span>
				  ))
				: ex;
	}

	sentenceTokenizerHandler(example, exampleId, type) {
		const props = this.props;
		typeof example === 'string' &&
			!isEnglish(example) &&
			tokenize(example).then(res => {
				let examples = props.breadcrumb.current.examples;
				examples[exampleId][type] = res;
				try {
					props.dispatch(
						setCurrentPanel({ ...props.breadcrumb.current, examples })
					);
				} catch (error) {
					console.log(error);
				}
			});
	}

	// componentDidMount() {
	// 	this.props.breadcrumb.current.examples.map((ex, exId) => {
	// 		this.sentenceTokenizerHandler(ex.original, exId, 'original');
	// 		this.sentenceTokenizerHandler(ex.translated, exId, 'translated');
	// 	});
	// }

	tokenized(example) {}

	render() {
		return (
			<ul className="exampleList">
				{this.props.breadcrumb.current.examples
					.filter(e => e.original.length < 40)
					.map((example, exampleId) => (
						<li className="exampleList__example" key={exampleId}>
							<p className="exampleList__example--original">
								{capString(example.original)}
								{/* {this.sentenceRenderingHandler(example.original)} */}
							</p>
							<p className="exampleList__example--translated">
								{capString(example.translated)}
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
