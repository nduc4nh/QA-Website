import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import rootReducer from './store/reducer/rootReducer';
import { createStore, compose, applyMiddleware } from "@reduxjs/toolkit";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


