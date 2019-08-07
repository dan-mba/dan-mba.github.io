/*
 * redux/actions/code.js
 *
 * store actions for the CodeTab component
 */

export const redirect = index => (
  { type: 'code/SET_REDIR', index }
);

export const selectCode = selected => (
  { type: 'code/SET_SELECTED', selected }
);
