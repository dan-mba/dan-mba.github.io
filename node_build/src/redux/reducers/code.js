/*
 * redux/reducers/code.js
 *
 * reducer for the CodeTab component
 */

import SAMPLES from '../../config/samples';
import LIBRARIES from '../../config/libraries';

const initialState = {
  selected: '',
  redirId: '',
  samples: SAMPLES,
  libraries: [],
  isIE11: !!window.MSInputMethodContext && !!document.documentMode,
};

export default (state = initialState, action) => {
  let curState = state;
  if (curState.libraries.length === 0) {
    const libs = {};

    Object.keys(LIBRARIES).forEach((lib) => {
      if (SAMPLES.some(samp => samp.libraries.indexOf(lib) >= 0)) {
        libs[lib] = LIBRARIES[lib];
      }
    });
    curState = { ...curState, libraries: libs };
  }

  switch (action.type) {
    case 'code/SET_REDIR':
      return { ...curState, redirId: action.index };
    case 'code/SET_SELECTED':
      return { ...curState, selected: action.selected };
    default:
      return curState;
  }
};
