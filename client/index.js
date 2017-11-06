import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import HomeApp from './home/components/home_app';
import homeApp from './home/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(homeApp, window.config.appData, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(<HomeApp store={store} />, document.getElementById("root"));
