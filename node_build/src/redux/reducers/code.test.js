import reducer from './code';
import SAMPLES from '../../config/samples';
import LIBRARIES from '../../config/libraries';

const libs = {};
Object.keys(LIBRARIES).forEach((lib) => {
  if (SAMPLES.some((samp) => samp.libraries.indexOf(lib) >= 0)) {
    libs[lib] = LIBRARIES[lib];
  }
});

const initialState = {
  selected: '',
  samples: SAMPLES,
  libraries: libs,
};

describe('code reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setting selected', () => {
    expect(reducer(undefined, {
      type: 'code/SET_SELECTED',
      selected: 'node',
    })).toEqual({
      selected: 'node',
      samples: SAMPLES,
      libraries: libs,
    });
  });
});
