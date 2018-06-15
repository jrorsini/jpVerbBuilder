import React from 'react';
import Header from './components/Header';
import ListPage from './components/pages/ListPage';
import SearchPage from './components/pages/SearchPage';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

const App = () => (
	<Router>
		<div>
			<Header />
			<Route exact path="/" component={SearchPage} />
			<Route path="/list" component={ListPage} />
		</div>
	</Router>
);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
