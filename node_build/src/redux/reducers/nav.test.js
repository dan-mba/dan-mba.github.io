import reducer from './nav';

describe('nav reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      anchorEl: null,
      selectedIndex: 1,
    });
  });

  it('should handle update anchor', () => {
    expect(reducer(undefined, {
      type: 'nav/UPDATE_ANCHOR',
      anchor: 'div',
    })).toEqual({
      anchorEl: 'div',
      selectedIndex: 1,
    });
  });

  it('should handle update selected', () => {
    expect(reducer(undefined, {
      type: 'nav/UPDATE_SELECTED',
      index: 3,
    })).toEqual({
      anchorEl: null,
      selectedIndex: 3,
    });
  });
});
