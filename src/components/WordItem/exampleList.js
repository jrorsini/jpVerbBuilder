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
	return (
		<ul className="exampleList">
			{props.wordPreview.examples.map((example, exampleId) => {
				return (
					<li className="exampleList__example" key={exampleId}>
						<span className="exampleList__example--original">
							{isEnglish(example.original) &&
								example.original.split(' ').map(
									w =>
										w === props.wordPreview.word ? (
											<b className="exampleList__example__word exampleList__example__word--highlighted">
												{w}
											</b>
										) : (
											<span
												className="exampleList__example__word"
												onClick={() => {
													searchHandler(w, props);
												}}
											>
												{w}
											</span>
										)
								)}
						</span>
						<span className="exampleList__example--translated">
							{example.translated}
						</span>
					</li>
				);
			})}
		</ul>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ExampleList);
