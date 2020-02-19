import reducer from './work';

describe('work reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      expanded: [false, false, false, false, false, false],
    });
  });

  it('should handle reset expanded', () => {
    expect(reducer(undefined, { type: 'work/RESET_EXPANDED' })).toEqual({
      expanded: [false, false, false, false, false, false],
    });
  });

  it('should handle toggle expanded', () => {
    expect(reducer(undefined, {
      type: 'work/TOGGLE_EXPANDED',
      index: 1,
    })).toEqual({
      expanded: [false, true, false, false, false, false],
    });
  });
});
