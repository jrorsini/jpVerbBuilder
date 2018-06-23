import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const WordList = props => (
	<div>
		<NavLink to="/word-practice">Practice</NavLink>
		<ul className="WordList__list">
			{props.verbs.reverse().map(verb => (
				<li className="WordList__item">
					<NavLink
						exact
						className="WordList__link"
						key={verb.kanji}
						to={`/word/${verb.kanji}`}
					>
						{verb.kanji}
					</NavLink>
					<button>Remove</button>
				</li>
			))}
		</ul>
	</div>
);

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordList);
