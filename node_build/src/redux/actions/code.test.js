import { selectCode } from './code';

it('should create an action to update selected', () => {
  const text = 'node';
  const expectedAction = {
    type: 'code/SET_SELECTED',
    selected: text,
  };
  expect(selectCode(text)).toEqual(expectedAction);
});
