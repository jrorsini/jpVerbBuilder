import React from 'React';
import { connect } from 'react-redux';

const Conjugation = props => {
	return (
		<div className="container">
			<p>Conjugation</p>
			<form>
				<label>
					て form <input name="teForm" type="checkbox" />
				</label>
				<label>
					ない form <input name="naiForm" type="checkbox" />
				</label>
			</form>

			<p>Choose one of the conjugation form to drill on.</p>
		</div>
	);
};

export default connect()(Conjugation);
