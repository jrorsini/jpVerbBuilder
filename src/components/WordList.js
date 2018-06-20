import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const WordList = props => {
	console.log(props);
	return (
		<div>
			<ul className="WordList__list">
				{props.verbs.map(verb => (
					<NavLink exact key={verb.kanji} to={`/word/${verb.kanji}`}>
						{verb.kanji}
					</NavLink>
				))}
			</ul>
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(WordList);
