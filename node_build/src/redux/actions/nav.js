/*
 * redux/actions/nav.js
 *
 * store actions for the NavHeader component
 */

import { selectCode } from './code';
import { resetJobs } from './work';

export const menuOpen = target => (
  { type: 'nav/UPDATE_ANCHOR', anchor: target }
);

export const menuClose = () => (
  { type: 'nav/UPDATE_ANCHOR', anchor: null }
);

export const menuSelect = index => (dispatch) => {
  dispatch(menuClose());
  dispatch(selectCode(''));
  dispatch(resetJobs());
  dispatch({ type: 'nav/UPDATE_SELECTED', index });
};
