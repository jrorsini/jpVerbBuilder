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

	console.log(props.conjugation);

	return (
		<div className="container">
			<p>Conjugation</p>
			<form>
				<label>
					て form{' '}
					<input name="teForm" type="checkbox" onChange={drillFormHandler} />
				</label>
				<label>
					ない form{' '}
					<input name="naiForm" type="checkbox" onChange={drillFormHandler} />
				</label>
			</form>
			{formsToDrill.length > 0 ? (
				<p>
					Now we're drilling for the following{' '}
					{formsToDrill.map((e, i) => <span>{e} </span>)}
				</p>
			) : (
				<p>Choose one of the conjugation form to drill on.</p>
			)}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Conjugation);
