import React from 'react';
import search from './logic/search_handler';
import VerbItem from './components/VerbItem';
import verbReducer from './reducers/verbReducer';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(verbReducer);

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
				<p>Try this one! 食べる</p>

				<form onSubmit={this.searchVerb}>
					<p>
						<input name="verbSearchBar" autoComplete="off" />
						{this.state.errorMessage && <span>{this.state.errorMessage}</span>}
					</p>
				</form>
				{this.state.verbPreview.kanji && (
					<VerbItem {...this.state.verbPreview} />
				)}
			</div>
		);
	}
}

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
