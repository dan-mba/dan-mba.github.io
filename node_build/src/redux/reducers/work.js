/*
 * redux/reducers/work.js
 *
 * reducer for the WorkTab component
 */

const initialState = {
  expanded: [false, false, false, false, false, false],
};

export default (state = initialState, action) => {
  const expanded = [...state.expanded];
  switch (action.type) {
    case 'work/TOGGLE_EXPANDED':
      expanded[action.index] = !state.expanded[action.index];
      return { ...state, expanded };
    case 'work/RESET_EXPANDED':
      return { ...state, expanded: initialState.expanded };
    default:
      return state;
  }
};
