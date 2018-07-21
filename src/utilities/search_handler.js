// ACTIONS
import { extendPanel, setCurrentPanel } from '../actions/breadcrumb';
import { setErrorTxt } from '../actions/errorMessage';

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
			? event.target.elements.verbSearchBar.value
			: event;

	let isInBreadCrumb = false;
	dispatch(setCurrentPanel());
	props.breadcrumb.panels.map(e => {
		if (e.word === word) isInBreadCrumb = e;
	});
	console.log(isInBreadCrumb);
	if (word) {
		if (isInBreadCrumb !== false) {
			dispatch(setCurrentPanel(isInBreadCrumb));
			dispatch(setErrorTxt(null));
		} else {
			search(word)
				.then(res => {
					dispatch(setCurrentPanel({ ...JSON.parse(res) }));
					dispatch(extendPanel({ ...JSON.parse(res) }));
					dispatch(setErrorTxt(null));
				})
				.catch(err => dispatch(setErrorTxt(err)));
		}
	} else {
		dispatch(setErrorTxt('You must input something. 入力して頂きませんか'));
	}

	document.getElementsByName('verbSearchBar')[0].value = '';
};
