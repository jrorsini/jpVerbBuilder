import React from 'react';
import { connect } from 'react-redux';

const List = props => {
	console.log(props);
	return (
		<div>
			{props.verbs && <ul>{props.verbs.map(verb => <li>{verb.kanji}</li>)}</ul>}
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(List);
