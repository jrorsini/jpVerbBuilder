import React from 'react';
import search from '../logic/search_handler';
import { connect } from 'react-redux';
import { setPreview } from '../actions/verbPreview';
import { setErrorTxt } from '../actions/errorMessage';

const searchBar = ({ dispatch }) => {
	const searchVerb = e => {
		const inputValue = e.target.elements.verbSearchBar.value;
		inputValue
			? search(inputValue)
					.then(res =>
						dispatch(
							setPreview({
								...JSON.parse(res)
							})
						)
					)
					.catch(err => dispatch(setErrorTxt(err)))
			: dispatch(setErrorTxt('Your enter input a verb!'));

		e.target.elements.verbSearchBar.value = '';
		e.preventDefault();
	};

	return (
		<form onSubmit={searchVerb}>
			<p>
				<input
					name="verbSearchBar"
					autoComplete="off"
					value="食べる"
					onChange={() => {}}
				/>
			</p>
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
