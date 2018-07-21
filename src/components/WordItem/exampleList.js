// REACT
import React from 'react';
import { connect } from 'react-redux';

// ACTIONS
import { extendPanel, setCurrentPanel } from '../../actions/breadcrumb';
import { setPreview } from '../../actions/wordPreview';
import { setErrorTxt } from '../../actions/errorMessage';

// UTILITIES
import search from '../../logic/search_handler';
import { tokenize, getTokenizer } from 'kuromojin';

getTokenizer({ dicPath: '/dict' });

const isEnglish = txt =>
	txt.match(
		/[^a-z/\s/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)]/gi
	) === null;

const replacer = match => {
	return match.trim() !== '' ? ` ${match} ` : ' ';
};

class ExampleList extends React.Component {
	searchHandler(e) {
		console.log(e);
		const word = e;
		const dispatch = this.props.dispatch;
		let isInBreadCrumb = false;
		dispatch(setPreview());
		this.props.breadcrumb.panels.map(e => {
			if (e.word === word) isInBreadCrumb = e;
		});
		if (word) {
			if (isInBreadCrumb !== false) {
				dispatch(setPreview(isInBreadCrumb));
				dispatch(setCurrentPanel(isInBreadCrumb));
				dispatch(setErrorTxt(null));
			} else {
				search(word)
					.then(res => {
						dispatch(setPreview({ ...JSON.parse(res) }));
						dispatch(setCurrentPanel({ ...JSON.parse(res) }));
						dispatch(extendPanel({ ...JSON.parse(res) }));
						dispatch(setErrorTxt(null));
					})
					.catch(err => dispatch(setErrorTxt(err)));
			}
		} else {
			dispatch(setErrorTxt('You must input something. 入力して頂きませんか'));
		}
	}

	sentenceRenderingHandler(ex = ex.replace(/\./, '')) {
		const p = this.props;
		console.log(ex);
		return typeof ex === 'string' && isEnglish(ex)
			? ex
					.replace(/[^a-zA-Z0-9&$]/gi, replacer)
					.split(/\s/gi)
					.map((w, i) => (
						<span
							className={`exampleList__example__word ${w.toLowerCase() ===
								p.wordPreview.word.toLowerCase() &&
								'exampleList__example__word--highlighted'}`}
							onClick={() => {
								w !== p.wordPreview.word && this.searchHandler(w);
							}}
							key={i}
						>
							{w}
						</span>
					))
			: typeof ex !== 'string'
				? ex.map((e, i) => (
						<span
							className={`exampleList__example__kanji ${e.surface_form.toLowerCase() ===
								p.wordPreview.word.toLowerCase() &&
								'exampleList__example__kanji--highlighted'}`}
							key={i}
							onClick={() => {
								e.surface_form !== p.wordPreview.word &&
									this.searchHandler(e.surface_form);
							}}
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
