import React from 'React';
import { connect } from 'react-redux';

const Conjugation = props => {
	return (
		<div className="container">
			<p>Conjugation</p>
		</div>
	);
};

const mapPropsToState = state => state;

export default connect(mapPropsToState)(Conjugation);
