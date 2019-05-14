require('./sass/styles.scss');

import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';
import {routerMiddleware, connectRouter, ConnectedRouter} from 'connected-react-router';
import rootReducer from './reducers';
import ScrollTop from './utils/ScrollTop';

const siteBaseUrl = RT_API.baseUrl.replace(['http://','https://'],'').replace(window.location.origin.replace(['http://','https://'],''), '');
const history = createBrowserHistory({basename: siteBaseUrl});
const compEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	connectRouter(history)(rootReducer),
	compEnhansers(
		applyMiddleware(
			routerMiddleware(history),
			promise(),
			thunk
		)
	)
);

import Blog from './containers/blog';
import Search from './containers/search';
import Category from './containers/category';
import Tag from './containers/tag';
import Single from './containers/single';


ReactDom.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<ScrollTop>
					<Route exact path="/blog" component={Blog}/>
					<Route path="/page/:pageNum" component={Blog}/>
					<Route path="/search/:term" component={Search}/>
					<Route path="/category/:slug/page/:pageNum" component={Category}/>
					<Route path="/category/:slug/" component={Category}/>
					<Route path="/category/:parent/:slug/page/:pageNum" component={Category}/>
					<Route path="/category/:parent/:slug/" component={Category}/>
					<Route path="/tag/:slug/page/:pageNum" component={Tag}/>
					<Route path="/tag/:slug" component={Tag}/>
					<Route path="*" component={Single}/>
				</ScrollTop>
			</Switch>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('react-main')
);