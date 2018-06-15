import React from 'react';
import VerbItem from '../VerbItem';
import SearchBar from '../SearchBar';

/**
	Search engine looking for verbs.s
 */
class SearchPage extends React.Component {
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

	render() {
		return (
			<div>
				<SearchBar />
				{this.state.verbPreview.kanji && (
					<VerbItem {...this.state.verbPreview} />
				)}
			</div>
		);
	}
}
