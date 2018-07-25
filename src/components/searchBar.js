// REACT
import React from 'react';
import { connect } from 'react-redux';

// UTILITIES
import { searchHandler } from '../utilities/search_handler';
import { toHiragana } from 'wanakana';

const searchBar = props => {
	return (
		<form
			onSubmit={e => {
				const regex = new RegExp('[-=!"~}{`]', 'g');
				const input = e.target.elements.wordSearchBar.value;
				console.log(input.match(regex));
				input.match(regex) === null && searchHandler(e, props);
				e.preventDefault();
			}}
		>
			<span>{props.errorMessage}</span>
			<p className="searchBar__container">
				<input
					name="wordSearchBar"
					className="searchBar__bar"
					autoComplete="off"
					onChange={() => {}}
				/>
				<button className="searchBar__button button">
					<p>
						<i className="material-icons">search</i>
						<span>Search</span>
					</p>
				</button>
			</p>
		</form>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(searchBar);
