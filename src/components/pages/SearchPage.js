import React from 'react';
import WordItem from '../WordItem';
import SearchBar from '../SearchBar';
import search from '../../logic/search_handler';
import { setPreview } from '../../actions/wordPreview';
import { setErrorTxt } from '../../actions/errorMessage';
import { connect } from 'react-redux';

/**
	Search engine looking for words
 */
const SearchPage = props => {
	console.log(props);
	return (
		<div className="container">
			<SearchBar />
			{props.breadcrumb.length > 0 && (
				<p>
					{props.breadcrumb.map(
						(e, i) =>
							i === 0 ? (
								<span key={i}>{e}</span>
							) : (
								<span
									onClick={() => {
										search(e)
											.then(res => {
												props.dispatch(
													setPreview({
														...JSON.parse(res)
													})
												);
												props.dispatch(setErrorTxt(null));
											})
											.catch(err => props.dispatch(setErrorTxt(err)));
									}}
									key={i}
								>
									{' '}
									> {e}
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
