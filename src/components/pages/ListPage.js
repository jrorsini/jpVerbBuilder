import React from 'react';
import WordList from '../WordList';
import { connect } from 'react-redux';

const List = props => {
	console.log(props);
	return <div className="container">{props.verbs && <WordList />}</div>;
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(List);

{
	/* <ul>
					{props.verbs.map(verb => <li key={verb.kanji}>{verb.kanji}</li>)}
				</ul> */
}
