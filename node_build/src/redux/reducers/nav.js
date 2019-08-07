/*
 * redux/reducers/nav.js
 *
 * reducer for the NavHeader component
 */

const initialState = {
  anchorEL: null,
  selectedIndex: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'nav/UPDATE_ANCHOR':
      return { ...state, anchorEl: action.anchor };
    case 'nav/UPDATE_SELECTED':
      return { ...state, selectedIndex: action.index };
    default:
      return state;
  }
};
