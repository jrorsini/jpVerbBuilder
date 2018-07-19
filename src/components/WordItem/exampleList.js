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

const isEnglish = txt => txt.match(/[^a-z/\s/\.\[\]\,\-]/gi) === null;

class ExampleList extends React.Component {
	searchHandler(e) {
		const dispatch = this.props.dispatch;
		console.log('object');
		search(e)
			.then(res => {
				dispatch(
					setPreview({
						...JSON.parse(res)
					})
				);
				dispatch(setErrorTxt(null));

				dispatch(extendPanel(e));
				dispatch(setCurrentPanel(e));
			})
			.catch(err => dispatch(setErrorTxt(err)));
	}

	sentenceRenderingHandler(ex = ex.replace(/\./, '')) {
		const p = this.props;
		return typeof ex === 'string' && isEnglish(ex)
			? ex.split(' ').map((w, i) => (
					<span
						className={`exampleList__example__word ${w === p.wordPreview.word &&
							'exampleList__example__word--highlighted'}`}
						onClick={() => {
							w !== p.wordPreview.word && this.searchHandler(w);
						}}
						key={i}
					>
						{w}
					</span>
			  ))
			: typeof ex === 'string'
				? ex
				: ex.map((e, i) => (
						<span
							className={`exampleList__example__word ${e.surface_form ===
								p.wordPreview.word &&
								'exampleList__example__word--highlighted'}`}
							key={i}
							onClick={() => {
								e.surface_form !== p.wordPreview.word &&
									this.searchHandler(e.surface_form);
							}}
						>
							{e.surface_form}
						</span>
				  ));
	}

	sentenceTokenizerHandler(example, exampleId, type) {
		const props = this.props;
		typeof example === 'string' &&
			!isEnglish(example) &&
			tokenize(example).then(res => {
				let examples = props.wordPreview.examples;
				examples[exampleId][type] = res;
				try {
					props.dispatch(setPreview({ ...props.wordPreview, examples }));
				} catch (error) {
					console.log(error);
				}
			});
	}

	componentDidMount() {
		console.log(this.props.wordPreview.examples);
		this.props.wordPreview.examples.map((ex, exId) => {
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
								{this.sentenceRenderingHandler(example.original)}
							</p>
							<p className="exampleList__example--translated">
								{this.sentenceRenderingHandler(example.translated)}
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
