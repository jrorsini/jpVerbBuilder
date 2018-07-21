// REACT
import React from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import WordItem from '../WordItem';
import SearchBar from '../SearchBar';
import BreadCrumb from '../BreadCrumb';

// UTILITIES
import search from '../../utilities/search_handler';
import { tokenize } from 'kuromojin';

// ACTIONS
import { setCurrentPanel } from '../../actions/breadcrumb';
import { setPreview } from '../../actions/wordPreview';
import { setErrorTxt } from '../../actions/errorMessage';

/**
	Search engine looking for words
 */
const SearchPage = props => {
	return (
		<div className="container">
			<SearchBar />
			{props.breadcrumb.panels.length > 0 && <BreadCrumb />}
			{props.wordPreview.word && <WordItem />}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(SearchPage);
