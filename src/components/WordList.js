import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeVerb } from '../actions/verbs';

const WordList = props => (
	<div>
		<NavLink to="/word-practice">Practice</NavLink>
		<ul className="WordList__list">
			{props.verbs.reverse().map(verb => (
				<li className="WordList__item" key={verb.kanji}>
					<NavLink exact className="WordList__link" to={`/word/${verb.kanji}`}>
						{verb.kanji} ({verb.hiragana})
					</NavLink>
					<button
						onClick={e => {
							props.dispatch(removeVerb(verb.kanji));
						}}
						className="WordList__button button"
					>
						Remove
					</button>
				</li>
			))}
		</ul>
	</div>
);

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordList);
