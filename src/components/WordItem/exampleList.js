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

const isEnglish = value => value.match(/[a-z]/gi) !== null;

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

const ExampleList = props => {
	//'私の名前はジャンです。'
	tokenize(props.wordPreview.examples[0].translated).then(res => {
		let examples = props.wordPreview.examples;
		examples[0].translated = res;
		console.log(props.wordPreview.examples);
		// res.map(e => console.log(e.surface_form));
		props.dispatch(setPreview({ ...props.wordPreview, examples }));
	});
	// typeof props.wordPreview.examples[0].translated === 'string' &&
	// tokenize(props.wordPreview.examples[0].translated).then(res => {
	// 	console.log(res);
	// 	props.dispatch(
	// 		setPreview({
	// 			...props.wordPreview,
	// 			examples: props.wordPreview.examples
	// 		})
	// 	);
	// });
	return (
		<ul className="exampleList">
			{props.wordPreview.examples.map((example, exampleId) => {
				return (
					<li className="exampleList__example" key={exampleId}>
						<p className="exampleList__example--original">
							{isEnglish(example.original)
								? example.original
										.replace(/\./, '')
										.split(' ')
										.map((w, i) => (
											<span
												className={`exampleList__example__word ${w ===
													props.wordPreview.word &&
													'exampleList__example__word--highlighted'}`}
												onClick={() => {
													w !== props.wordPreview.word &&
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
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ExampleList);

/*

*/
