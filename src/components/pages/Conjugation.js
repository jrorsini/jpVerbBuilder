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

console.log(c);

const formNames = {
	tekei: 'テ形',
	mizenkei: '未然形',
	kateikei: '仮定形',
	kakokei: '過去形'
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

	props.conjugation.current.verb &&
		console.log(
			c.tekei(
				props.conjugation.current.verb.surface_form,
				props.conjugation.current.verb.conjugated_type
			)
		);

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
				props.conjugation.current.verb && (
					<div>
						<div className="conjugation__direction">
							<span>
								<small>
									{toHiragana(props.conjugation.current.verb.reading)}
								</small>
								{props.conjugation.current.verb.surface_form}
							</span>
							<b>+</b>
							<span>
								{formsToDrill.length === 1
									? formNames[formsToDrill[0]]
									: formNames[props.conjugation.current.form]}
							</span>
						</div>
						<form>
							<input type="text" className="conjugation__input" />
						</form>
					</div>
				)}
		</div>
	);
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Conjugation);
