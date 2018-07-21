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
				searchHandler(e, props);
				e.preventDefault();
			}}
		>
			<span>{props.errorMessage}</span>
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(searchBar);
