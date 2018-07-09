import React from 'react';
import VerbItem from '../VerbItem';
import SearchBar from '../SearchBar';
import { connect } from 'react-redux';

/**
	Search engine looking for words
 */
const SearchPage = ({ word }) => {
	return (
		<div className="container">
			<SearchBar />
			{word && <VerbItem />}
		</div>
	);
};

const mapStateToProps = state => {
	return state.wordPreview;
};

export default connect(mapStateToProps)(SearchPage);
