import React from 'react';
import WordItem from '../WordItem';
import SearchBar from '../SearchBar';
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
							i === 0 ? <span key={i}>{e}</span> : <span key={i}> > {e}</span>
					)}
				</p>
			)}
			{props.wordPreview.word && <WordItem />}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(SearchPage);
