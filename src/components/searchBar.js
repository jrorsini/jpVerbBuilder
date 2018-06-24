import React from 'react';
import search from '../logic/search_handler';
import { connect } from 'react-redux';
import { setPreview } from '../actions/verbPreview';
import { setErrorTxt } from '../actions/errorMessage';
import { toHiragana } from 'wanakana';
import { tokenize, getTokenizer } from 'kuromojin';

getTokenizer({ dicPath: '/dict' });

const searchBar = ({ errorMessage, dispatch }) => {
	/**
		SearchVerb function that fetches data from one verb (taken as an argument)
	 */
	const searchVerb = e => {
		const inputValue = e.target.elements.verbSearchBar.value;
		inputValue && inputValue.match(/[a-z]/gi) === null
			? search(inputValue)
					.then(res => {
						tokenize(inputValue).then(results => {
							const hiraganaReading = toHiragana(results[0].reading);
							dispatch(
								setPreview({
									...JSON.parse(res),
									hiragana: hiraganaReading
								})
							);
							dispatch(setErrorTxt(null));
						});
					})
					.catch(err => dispatch(setErrorTxt(err)))
			: dispatch(setErrorTxt('Your enter input a verb!'));

		e.target.elements.verbSearchBar.value = '';
		e.preventDefault();
	};

	return (
		<form onSubmit={searchVerb}>
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
			<span>{errorMessage}</span>
		</form>
	);
};

const mapStateToProps = ({ verbPreview, errorMessage }) => {
	return {
		verbPreview,
		errorMessage
	};
};

export default connect(mapStateToProps)(searchBar);
