import React from 'react';
import WordItem from '../WordItem';
import SearchBar from '../SearchBar';
import { connect } from 'react-redux';

/**
	Search engine looking for words
 */
const SearchPage = ({ word }) => {
	return (
		<div className="container">
			<SearchBar />
			{word && <WordItem />}
		</div>
	);
};

const mapStateToProps = state => {
	return state.wordPreview;
};

export default connect(mapStateToProps)(SearchPage);
