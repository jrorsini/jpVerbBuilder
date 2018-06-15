import React from 'react';
import search from './logic/search_handler';
import Header from './components/Header';
import VerbItem from './components/VerbItem';
import SearchBar from './components/SearchBar';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';

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

const App = () => (
	<Router>
		<div>
			<Header />
			<Route exact path="/" component={SearchPage} />
			<Route path="/list" component={List} />
		</div>
	</Router>
);

const List = () => (
	<div>
		<p>List</p>
	</div>
);

const store = configureStore();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
