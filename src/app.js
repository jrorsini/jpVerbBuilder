import React from 'react';
import ReactDOM from 'react-dom';
import search from './logic/search_handler';
import VerbItem from './components/VerbItem';

class JpVerbBuilder extends React.Component {
	state = {
		errorMessage: null,
		verb: {
			kanji: null,
			hiragana: null,
			meaning: null,
			exampleList: null
		}
	};

	searchVerb = e => {
		const inputValue = e.target.elements.verbSearchBar.value;
		inputValue
			? search(inputValue)
					.then(res => {
						this.setState(() => ({
							verb: {
								...JSON.parse(res)
							}
						}));
					})
					.catch(err => console.log(err))
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
						<input name="verbSearchBar" />
						{this.state.errorMessage && <span>{this.state.errorMessage}</span>}
					</p>
				</form>
				{this.state.verb.kanji && <VerbItem {...this.state.verb} />}
			</div>
		);
	}
}

ReactDOM.render(<JpVerbBuilder />, document.getElementById('app'));
