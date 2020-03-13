/*
 * redux/rootReducer.js
 *
 * combine the component reducers
 */

import { combineReducers } from 'redux';
import nav from './reducers/nav';
import code from './reducers/code';

const rootReducer = combineReducers({
  nav,
  code,
});

export default rootReducer;
