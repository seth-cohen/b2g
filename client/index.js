import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import HomeApp from './home/components/home_app';
import homeApp from './home/reducers';

const store = createStore(homeApp, window.config.appData, applyMiddleware(thunk));

ReactDOM.render(<HomeApp store={store} />, document.getElementById("root"));
