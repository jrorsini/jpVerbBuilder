// ACTIONS
import { extendPanel, setCurrentPanel } from '../actions/breadcrumb';
import { setErrorTxt } from '../actions/errorMessage';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { containSpecialChar } from './eng_tokenizer';
import { isEnglish } from '../utilities/eng_tokenizer';

const speechPart = {
	// pos
	'*': 'general',
	名詞: 'noun',
	動詞: 'verb',
	副詞: 'adverb',
	記号: 'symbol',
	助詞: 'particle',
	接頭詞: 'prefix',
	形容詞: 'adjective',
	接続詞: 'conjuction',
	感動詞: 'interjection',
	助動詞: 'auxiliaryVerb',
	連体詞: 'adnominalAdjective',
	フィラー: 'filler',
	// pos1
	数: 'number',
	空白: 'blank space',
	句点: 'sign-period',
	接尾: 'suffix',
	一般: 'common',
	自立: 'independent',
	特殊: 'special',
	副詞化: 'adverb',
	代名詞: 'pronoun',
	括弧開: 'brackets',
	非自立: 'dependent',
	括弧閉: 'close braket',
	連体化: 'abdominal-adj',
	係助詞: 'binding particle',
	副助詞: 'adverbial particle?',
	格助詞: 'particle-case marking',
	終助詞: 'sentence-ending particle',
	固有名詞: 'proper noun?',
	サ変接続: 'irr-conjuction',
	並立助詞: 'parallel marker',
	名詞接続: 'noun conjonction',
	接続助詞: 'conjunctive particle?',
	助詞類接続: 'particle-conjunctive',
	形容動詞語幹: 'adjective-common',
	アルファベット: ' alphabet',
	ナイ形容詞語幹: 'i-adjective',
	'副助詞／並立助詞／終助詞': 'adverbial particle​',
	// pos2
	人名: "person's name?",
	引用: 'quotation',
	組織: 'structure',
	地域: 'region',
	助数詞: 'counter suffix',
	助動詞語幹: 'auxiliary verb? stem',
	副詞可能: 'potential-adverb',
	// pos3
	名: 'name',
	姓: 'surname',
	国: 'country'
};

const search = word =>
	new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		// xhr.open('GET', `http://165.227.213.125:1234/search/${word}/`); // PROD
		xhr.open('GET', `http://localhost:1234/search/${word}/`); // DEV
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
		if (containSpecialChar(word)) {
			dispatch(setErrorTxt('Your search contained unvalid characters'));
		} else {
			if (isInBreadCrumb !== false) {
				dispatch(setCurrentPanel(isInBreadCrumb));
				dispatch(setErrorTxt(null));
			} else {
				console.log('object');
				dispatch(showLoading());
				search(word)
					.then(res => JSON.parse(res))
					.then(json => {
						console.log(json);
						if (json.word !== '') {
							dispatch(setCurrentPanel({ ...json }));
							dispatch(extendPanel({ ...json }));
							dispatch(setErrorTxt(null));
							dispatch(hideLoading());
						} else {
							dispatch(setErrorTxt(`Apologies,  ${word} could not be found`));
							dispatch(hideLoading());
						}
					})
					.catch(err => dispatch(setErrorTxt(err)));
			}
		}
	} else {
		dispatch(setErrorTxt('You must input something. 入力して頂きませんか'));
	}

	document.getElementsByName('wordSearchBar')[0].value = '';
};
