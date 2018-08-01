import React from 'React';
import { connect } from 'react-redux';
import { addToDrill, removeFromDrill } from '../../actions/conjugation';

const Conjugation = props => {
	const dispatch = props.dispatch;
	const formsToDrill = props.conjugation.formsToDrill;

	const drillFormHandler = e => {
		const form = e.target.name;
		formsToDrill.indexOf(form) === -1
			? dispatch(addToDrill(form))
			: dispatch(removeFromDrill(form));
	};

	const verbIntoWordbook = () => {
		let res = false;
		props.words.map(e => {
			if (e.type === 'verb') res = true;
		});
		return res;
	};

	const renderForm = () =>
		props.conjugation.formsToDrill[
			Math.floor(
				Math.random() * Math.floor(props.conjugation.formsToDrill.length)
			)
		];

	const getRandomVerb = verbList =>
		verbList[Math.floor(Math.random() * Math.floor(verbList.length))];

	const renderVerb = () =>
		verbIntoWordbook()
			? getRandomVerb(props.words.filter(e => e.type === 'verb'))
			: getRandomVerb(props.conjugation.verbs);

	console.log(renderVerb());
	return (
		<div className="container">
			<p>Conjugation</p>
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
					<p>{renderForm()}</p>
					<p>{renderVerb()}</p>
				</div>
			) : (
				<p>Choose one of the conjugation form to drill on.</p>
			)}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Conjugation);
