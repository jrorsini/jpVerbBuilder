import React from 'React';
import { connect } from 'react-redux';

const Conjugation = props => {
	console.log(props);
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

			{props.conjugation.formsToDrill.length > 0 ? (
				<p>Now we're drilling</p>
			) : (
				<p>Choose one of the conjugation form to drill on.</p>
			)}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Conjugation);
