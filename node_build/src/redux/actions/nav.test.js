import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { menuOpen, menuClose, menuSelect } from './nav';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('creates an action for a menu open', () => {
    const anchor = 'anchor';
    const expectedAction = {
      type: 'nav/UPDATE_ANCHOR',
      anchor,
    };
    expect(menuOpen(anchor)).toEqual(expectedAction);
  });

  it('creates an anction for a menu close', () => {
    const expectedAction = {
      type: 'nav/UPDATE_ANCHOR',
      anchor: null,
    };
    expect(menuClose()).toEqual(expectedAction);
  });
});

describe('thunk actions', () => {
  it('creates an action to handle a menu selection', () => {
    const index = 2;
    const expectedActions = [
      { type: 'nav/UPDATE_ANCHOR', anchor: null },
      { type: 'code/SET_SELECTED', selected: '' },
      { type: 'work/RESET_EXPANDED' },
      { type: 'nav/UPDATE_SELECTED', index },
    ];

    const store = mockStore({ index: 0 });

    store.dispatch(menuSelect(index));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
