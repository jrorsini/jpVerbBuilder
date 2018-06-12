import React from 'react';
import ReactDOM from 'react-dom';
import search from './logic/search_handler';
import VerbItem from './components/VerbItem';

class JpVerbBuilder extends React.Component {
	state = {
		verb: {
			kanji: null,
			hiragana: null,
			meaning: null,
			exampleList: null
		}
	};

	searchVerb = e => {
		search(e.target.elements.verbSearchBar.value)
			.then(res => {
				this.setState(() => ({
					verb: {
						...JSON.parse(res)
					}
				}));
			})
			.catch(err => console.log(err));
		console.log();
		e.target.elements.verbSearchBar.value = '';
		e.preventDefault();
	};

	render() {
		return (
			<div>
				<form onSubmit={this.searchVerb}>
					<input name="verbSearchBar" />
				</form>
				{this.state.verb.kanji && <VerbItem {...this.state.verb} />}
			</div>
		);
	}
}

ReactDOM.render(<JpVerbBuilder />, document.getElementById('app'));
