/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WorkTab } from './WorkTab';

Enzyme.configure({ adapter: new Adapter() });
global.open = jest.fn();

function setup() {
  const props = {
    classes: {
      root: 'abc',
      list: 'def',
      avatar: 'ghi',
      avatarRoot: 'jkl',
      content: 'mno',
      header: 'pqr',
      title: 'stu',
      subheader: 'vwx',
      jobDescription: 'yza',
      expand: 'bcd',
      expandOpen: 'efg',
    },
    expanded: [false, false, false, false, false, true],
    dispatch: jest.fn(),
  };

  const enzymeWrapper = mount(<WorkTab {...props} />);

  return { enzymeWrapper, props };
}

describe('Work Tab', () => {
  it('should render main Tab', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('#work-tab').first().hasClass('abc')).toBe(true);
  });
});
