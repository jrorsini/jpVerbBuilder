import React from 'react';
import VerbItem from '../VerbItem';
import SearchBar from '../SearchBar';
import { connect } from 'react-redux';

/**
	Search engine looking for verbs.s
 */
const SearchPage = ({ kanji }) => {
	return (
		<div className="container">
			<p>Let's look up for a word!</p>
			<SearchBar />
			{kanji && <VerbItem />}
		</div>
	);
};

const mapStateToProps = state => {
	return state.verbPreview;
};

export default connect(mapStateToProps)(SearchPage);
