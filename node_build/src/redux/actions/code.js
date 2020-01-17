/*
 * redux/actions/code.js
 *
 * store actions for the CodeTab component
 */

export const selectCode = (selected) => (
  { type: 'code/SET_SELECTED', selected }
);

export default selectCode;
