/*
 * redux/rootReducer.js
 *
 * combine the component reducers
 */

import { combineReducers } from 'redux';
import nav from './reducers/nav';
import code from './reducers/code';
import work from './reducers/work';

const rootReducer = combineReducers({
  nav,
  code,
  work,
});

export default rootReducer;
