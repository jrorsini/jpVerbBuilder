import React from 'React';
import { connect } from 'react-redux';
import {
	addToDrill,
	removeFromDrill,
	setCurrentVerb,
	setCurrentForm
} from '../../actions/conjugation';

const formNames = {
	teForm: 'て形',
	naiForm: 'ない形'
};

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
					{formNames['teForm']}
					<input name="teForm" type="checkbox" onChange={drillFormHandler} />
				</label>
				<label>
					{formNames['naiForm']}
					<input name="naiForm" type="checkbox" onChange={drillFormHandler} />
				</label>
			</form>
			{props.conjugation.formsToDrill.length > 0 &&
			props.conjugation.current.form &&
			props.conjugation.current.verb ? (
				<div className="conjugation__direction">
					<span>{props.conjugation.current.verb}</span>
					<b>+</b>
					<span>
						{formsToDrill.length === 1
							? formNames[formsToDrill[0]]
							: formNames[props.conjugation.current.form]}
					</span>
				</div>
			) : (
				<p>Choose one of the conjugation form to drill on.</p>
			)}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Conjugation);
