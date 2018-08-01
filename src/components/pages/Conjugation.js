import React from 'React';
import { connect } from 'react-redux';
import {
	addToDrill,
	removeFromDrill,
	setCurrentVerb,
	setCurrentForm
} from '../../actions/conjugation';

const Conjugation = props => {
	const dispatch = props.dispatch;
	const formsToDrill = props.conjugation.formsToDrill;

	const drillFormHandler = e => {
		const form = e.target.name;
		formsToDrill.indexOf(form) === -1
			? dispatch(addToDrill(form))
			: dispatch(removeFromDrill(form));

		renderVerb();
		formsToDrill.length > 1 ? renderForm() : renderForm(form);
	};

	const verbIntoWordbook = () => {
		let res = false;
		props.words.map(e => {
			if (e.type === 'verb') res = true;
		});
		return res;
	};

	const renderForm = form =>
		formsToDrill.length > 0 && formsToDrill.length > 1
			? dispatch(
					setCurrentForm(
						formsToDrill[
							Math.floor(Math.random() * Math.floor(formsToDrill.length))
						]
					)
			  )
			: dispatch(setCurrentForm(form));

	const getRandomVerb = verbList =>
		verbList[Math.floor(Math.random() * Math.floor(verbList.length))];

	const renderVerb = () =>
		verbIntoWordbook()
			? dispatch(
					setCurrentVerb(
						getRandomVerb(props.words.filter(e => e.type === 'verb'))
					)
			  )
			: dispatch(setCurrentVerb(getRandomVerb(props.conjugation.verbs)));

	return (
		<div className="container">
			<form>
				<label>
					て form{' '}
					<input name="teForm" type="checkbox" onChange={drillFormHandler} />
				</label>
				<label>
					{' '}
					ない form{' '}
					<input name="naiForm" type="checkbox" onChange={drillFormHandler} />
				</label>
			</form>
			{formsToDrill.length > 0 ? (
				<div>
					<p>
						{props.conjugation.current.form && props.conjugation.current.form}
					</p>
					<p>
						{props.conjugation.current.verb && props.conjugation.current.verb}
					</p>
				</div>
			) : (
				<p>Choose one of the conjugation form to drill on.</p>
			)}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Conjugation);
