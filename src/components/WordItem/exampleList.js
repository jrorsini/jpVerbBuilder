// REACT
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { extendPanel, setCurrentPanel } from '../../actions/breadcrumb';
import { addWord, removeWord } from '../../actions/verbs';
import { setPreview } from '../../actions/wordPreview';
import { setErrorTxt } from '../../actions/errorMessage';

// UTILITIES
import search from '../../logic/search_handler';
import { tokenize, getTokenizer } from 'kuromojin';

getTokenizer({ dicPath: '/dict' });

const isEnglish = txt => txt.match(/[^a-z/\s/\./\,]/gi) === null;

const searchHandler = (e, props) => {
	search(e)
		.then(res => {
			props.dispatch(
				setPreview({
					...JSON.parse(res)
				})
			);
			props.dispatch(setErrorTxt(null));

			props.dispatch(extendPanel(e));
			props.dispatch(setCurrentPanel(e));
		})
		.catch(err => props.dispatch(setErrorTxt(err)));
};

class ExampleList extends React.Component {
	sentenceTokenizerHandler(example, exampleId, type) {
		typeof example === 'string' &&
			!isEnglish(example) &&
			tokenize(example).then(res => {
				let examples = this.props.wordPreview.examples;
				examples[exampleId][type] = res;
				props.dispatch(setPreview({ ...this.props.wordPreview, examples }));
			});
	}

	//'私の名前はジャンです。'
	componentDidMount() {
		this.props.wordPreview.examples.map((ex, exId) => {
			console.log(
				typeof ex.translated === 'string' && !isEnglish(ex.translated)
			);
			this.sentenceTokenizerHandler(ex.original, exId, 'original');
			this.sentenceTokenizerHandler(ex.translated, exId, 'translated');
		});
	}

	render() {
		return (
			<ul className="exampleList">
				{this.props.wordPreview.examples.map((example, exampleId) => {
					return (
						<li className="exampleList__example" key={exampleId}>
							<p className="exampleList__example--original">
								{typeof example.original === 'string' &&
								isEnglish(example.original)
									? example.original
											.replace(/\./, '')
											.split(' ')
											.map((w, i) => (
												<span
													className={`exampleList__example__word ${w ===
														this.props.wordPreview.word &&
														'exampleList__example__word--highlighted'}`}
													onClick={() => {
														w !== this.props.wordPreview.word &&
															searchHandler(w, props);
													}}
													key={i}
												>
													{w}
												</span>
											))
									: example.original}
							</p>
							<p className="exampleList__example--translated">
								{typeof example.translated === 'string' &&
								isEnglish(example.translated)
									? example.translated
											.replace(/\./, '')
											.split(' ')
											.map((w, i) => (
												<span
													className="exampleList__example__word"
													onClick={() => {
														searchHandler(w, props);
													}}
													key={i}
												>
													{w}
												</span>
											))
									: typeof example.translated === 'string'
										? example.translated
										: example.translated.map((e, i) => (
												<span key={i}>{e.surface_form}</span>
										  ))}
							</p>
						</li>
					);
				})}
			</ul>
		);
	}
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ExampleList);

/*

*/
