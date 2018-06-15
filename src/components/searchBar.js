import React from 'react';
import { setErrorTxt } from '../actions/errorMessage';
import { connect } from 'redux';

const searchVerb = e => {
	const inputValue = e.target.elements.verbSearchBar.value;
	inputValue
		? search(inputValue)
				.then(res => {
					this.setState(() => ({
						verbPreview: {
							...JSON.parse(res)
						}
					}));
				})
				.catch(err => setErrorTxt(err))
		: setErrorTxt('Your enter input a verb!');

	e.target.elements.verbSearchBar.value = '';
	e.preventDefault();
};

const searchBar = () => (
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


export connect()(searchBar)