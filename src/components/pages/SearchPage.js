import React from 'react';
import WordItem from '../WordItem';
import SearchBar from '../SearchBar';
import search from '../../logic/search_handler';
import { setCurrentPanel } from '../../actions/breadcrumb';
import { setPreview } from '../../actions/wordPreview';
import { setErrorTxt } from '../../actions/errorMessage';
import { connect } from 'react-redux';

/**
	Search engine looking for words
 */
const SearchPage = props => {
	const breadCrumbClickHandler = word => {
		search(word)
			.then(res => {
				props.dispatch(
					setPreview({
						...JSON.parse(res)
					})
				);
				props.dispatch(setErrorTxt(null));
				props.dispatch(setCurrentPanel(word));
			})
			.catch(err => props.dispatch(setErrorTxt(err)));
	};
	console.log(props);
	return (
		<div className="container">
			<SearchBar />
			{props.breadcrumb.panels.length > 0 && (
				<p className="breadcrumb">
					{props.breadcrumb.panels.map(
						(e, i) =>
							e === props.breadcrumb.current ? (
								<span key={i} className="breadcrumb__panel">
									{e}
								</span>
							) : (
								<span
									key={i}
									className="breadcrumb__panel breadcrumb__panel--active"
									onClick={() => breadCrumbClickHandler(e)}
								>
									{e}
								</span>
							)
					)}
				</p>
			)}
			{props.wordPreview.word && <WordItem />}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(SearchPage);
