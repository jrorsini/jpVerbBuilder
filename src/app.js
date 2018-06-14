import React from 'react';
import search from './logic/search_handler';
import VerbItem from './components/VerbItem';
import SearchBar from './components/SearchBar';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';

/**
	Search engine looking for verbs.s
 */
class App extends React.Component {
	state = {
		errorMessage: null,
		verbPreview: {
			kanji: null,
			hiragana: null,
			meaning: null,
			exampleList: null
		},
		verbs: []
	};

	searchVerb = e => {
		const inputValue = e.target.elements.verbSearchBar.value;
		inputValue
			? search(inputValue)
					.then(res => {
						this.setState(() => ({
							verbPreview: {
								...JSON.parse(res)
							}
						}));
					})
					.catch(err =>
						this.setState(() => ({
							errorMessage: err
						}))
					)
			: this.setState(() => ({
					errorMessage: 'Your enter input a verb!'
			  }));
		e.target.elements.verbSearchBar.value = '';
		e.preventDefault();
	};

	render() {
		return (
			<div>
				<SearchBar searchVerb={this.searchVerb} />
				{this.state.verbPreview.kanji && (
					<VerbItem {...this.state.verbPreview} />
				)}
			</div>
		);
	}
}

const store = configureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
