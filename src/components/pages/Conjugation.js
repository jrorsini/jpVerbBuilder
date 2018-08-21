import React from 'React';
import { connect } from 'react-redux';
import {
	addToDrill,
	removeFromDrill,
	startSettingCurrentVerb,
	setCurrentForm
} from '../../actions/conjugation';
import { c } from '../../classes/conjugator';
import { toHiragana } from 'wanakana';
import { tokenize } from 'kuromojin';

const formNames = {
	tekei: 'テ形',
	mizenkei: '未然形',
	kateikei: '仮定形',
	kakokei: '過去形'
};

console.log(toHiragana('konna'));

// https://upload.wikimedia.org/wikipedia/commons/6/68/AMB_Japanese_Verbs.pdf

const Conjugation = props => {
	const dispatch = props.dispatch;
	const formsToDrill = props.conjugation.formsToDrill;
	const currVerb = props.conjugation.current.verb;

	const drillFormHandler = e => {
		const form = e.target.name;
		formsToDrill.indexOf(form) === -1
			? dispatch(addToDrill(form))
			: dispatch(removeFromDrill(form));

		document.getElementById('conjugation__input') &&
			document
				.getElementById('conjugation__input')
				.addEventListener('keydown', e => {
					console.log(e.target.elements.conjugation__input.value);
					document.getElementById('conjugation__input').value = 'test';
				});
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

	const getRandomVerb = verbList => {
		const verb =
			verbList[Math.floor(Math.random() * Math.floor(verbList.length))];
		return verb.hasOwnProperty('word') ? verb.word : verb;
	};

	const renderVerb = () =>
		verbIntoWordbook()
			? dispatch(
					startSettingCurrentVerb(
						getRandomVerb(props.words.filter(e => e.type === 'verb'))
					)
			  )
			: dispatch(
					startSettingCurrentVerb(getRandomVerb(props.conjugation.verbs))
			  );

	const onSubmitHandler = e => {
		console.log(e.target.elements.conjugation__input.value);

		currVerb &&
			console.log(c.tekei(currVerb.surface_form, currVerb.conjugated_type));
		e.preventDefault();
	};

	const onKeyUpHandler = e => (e.target.value = toHiragana(e.target.value));

	return (
		<div className="container">
			<form className="conjugation_form">
				{Object.keys(formNames).map((e, i) => (
					<span key={i}>
						<input
							name={e}
							type="checkbox"
							checked={
								props.conjugation.formsToDrill.indexOf(e) !== -1 ? true : false
							}
							onChange={drillFormHandler}
						/>
						<label>{formNames[e]}</label>
					</span>
				))}
			</form>
			{props.conjugation.formsToDrill.length > 0 &&
				props.conjugation.current.form &&
				currVerb && (
					<div>
						<div className="conjugation__direction">
							<span>
								<small>{toHiragana(currVerb.reading)}</small>
								{currVerb.surface_form}
							</span>
							<b>+</b>
							<span>
								{formsToDrill.length === 1
									? formNames[formsToDrill[0]]
									: formNames[props.conjugation.current.form]}
							</span>
						</div>
						<form onSubmit={onSubmitHandler}>
							<input
								type="text"
								onKeyUp={onKeyUpHandler}
								name="conjugation__input"
								id="conjugation__input"
								className="conjugation__input"
							/>
						</form>
					</div>
				)}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Conjugation);
