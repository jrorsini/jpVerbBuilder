import React from 'React';
import { connect } from 'react-redux';

const Conjugation = props => {
	const dispatch = props.dispatch;
	const drillFormHandler = e => {
		const form = e.target.name;
		props.conjugation.formsToDrill.indexOf(form) === -1;
	};

	return (
		<div className="container">
			<p>Conjugation</p>
			<form>
				<label>
					て form<input
						name="teForm"
						type="checkbox"
						onChange={drillFormHandler}
					/>
				</label>
				<label>
					ない form<input
						name="naiForm"
						type="checkbox"
						onChange={drillFormHandler}
					/>
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
