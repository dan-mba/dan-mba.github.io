/* eslint react/jsx-filename-extension: "off" */
/*
 * index.jsx
 *
 * The file renders the main App component wrapped by the Redux store
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div,
  );
});
