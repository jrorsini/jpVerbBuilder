// REACT
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import WordItem from '../WordItem';
import SearchBar from '../SearchBar';
import BreadCrumb from '../BreadCrumb';

/**
	Search engine looking for words
 */

const Search = props => {
	return (
		<div className="container">
			<SearchBar />
			{props.breadcrumb.panels.length > 0 && <BreadCrumb />}
			{props.breadcrumb.current && (
				<WordItem word={props.breadcrumb.current} page="search" />
			)}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Search);
