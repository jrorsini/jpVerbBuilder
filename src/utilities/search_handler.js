// ACTIONS
import { extendPanel, setCurrentPanel } from '../actions/breadcrumb';
import { setErrorTxt } from '../actions/errorMessage';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const search = word =>
	new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `http://localhost:1234/search/${word}/`);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				resolve(xhr.responseText);
			} else if (xhr.status !== 200) {
				reject(xhr.statusText);
			}
		};
	});

export const searchHandler = (event, props) => {
	const dispatch = props.dispatch;
	const word =
		typeof event !== 'string'
			? event.target.elements.wordSearchBar.value
			: event;
	let isInBreadCrumb = false;

	props.breadcrumb.panels.map(e => {
		if (e.word.toLowerCase() === word.toLowerCase()) isInBreadCrumb = e;
	});
	if (word) {
		if (isInBreadCrumb !== false) {
			dispatch(setCurrentPanel(isInBreadCrumb));
			dispatch(setErrorTxt(null));
		} else {
			dispatch(showLoading());
			search(word)
				.then(res => {
					if (JSON.parse(res).word !== '') {
						dispatch(setCurrentPanel({ ...JSON.parse(res) }));
						dispatch(extendPanel({ ...JSON.parse(res) }));
						dispatch(setErrorTxt(null));
						dispatch(hideLoading());
					} else {
						dispatch(setErrorTxt(`Apologies,  ${word} could not be found`));
						dispatch(hideLoading());
					}
				})
				.catch(err => dispatch(setErrorTxt(err)));
		}
	} else {
		dispatch(setErrorTxt('You must input something. 入力して頂きませんか'));
	}

	document.getElementsByName('wordSearchBar')[0].value = '';
};
