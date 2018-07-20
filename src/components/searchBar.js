// REACT
import React from 'react';
import { connect } from 'react-redux';

// UTILITIES
import search from '../logic/search_handler';
import { toHiragana } from 'wanakana';

// ACTIONS
import { setPreview } from '../actions/wordPreview';
import { extendPanel, setCurrentPanel } from '../actions/breadcrumb';
import { setErrorTxt } from '../actions/errorMessage';

const searchBar = ({ errorMessage, dispatch }) => {
	/**
		SearchVerb function that fetches data from one verb (taken as an argument)
	 */
	const searchVerb = e => {
		const inputValue = e.target.elements.verbSearchBar.value;
		dispatch(setPreview());
		inputValue
			? search(inputValue)
					.then(res => {
						dispatch(setPreview({ ...JSON.parse(res) }));
						dispatch(setCurrentPanel({ ...JSON.parse(res) }));
						dispatch(extendPanel({ ...JSON.parse(res) }));
						dispatch(setErrorTxt(null));
					})
					.catch(err => dispatch(setErrorTxt(err)))
			: dispatch(setErrorTxt('You must input something. 入力して頂きませんか'));

		e.target.elements.verbSearchBar.value = '';
		e.preventDefault();
	};

	return (
		<form onSubmit={searchVerb}>
			<span>{errorMessage}</span>
			<p className="searchBar__container">
				<input
					name="verbSearchBar"
					className="searchBar__bar"
					autoComplete="off"
					onChange={() => {}}
				/>
				<button className="searchBar__button button">
					<i className="material-icons">search</i>Search
				</button>
			</p>
		</form>
	);
};

const mapStateToProps = ({ wordPreview, errorMessage }) => {
	return {
		wordPreview,
		errorMessage
	};
};

export default connect(mapStateToProps)(searchBar);
