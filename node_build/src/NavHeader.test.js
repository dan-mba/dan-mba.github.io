/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavHeader } from './NavHeader';

Enzyme.configure({ adapter: new Adapter() });
global.open = jest.fn();

function setup() {
  const props = {
    classes: {
      appBar: 'abc',
      toolbar: 'def',
      linkedin: 'ghi',
      name: 'jkl',
      buttonRoot: 'mno',
      iconButton: 'pqr',
      menuText: 'stu',
    },
    location: {
      pathname: '/',
    },
    anchorEl: null,
    selectedIndex: 1,
    dispatch: jest.fn(),
  };

  const enzymeWrapper = mount(<NavHeader {...props} />);

  return { enzymeWrapper, props };
}

describe('Nav Bar', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('#nav-header').first().hasClass('abc')).toBe(true);

    /*
    FUTURE: Implement test for menu items
    The code below simulates clicking on the menu button & setting the anchor
    Enzyme still does not render the menu & I can't figure out why

    enzymeWrapper.find('button').simulate('click');
    const { anchor } = props.dispatch.mock.calls[1][0];
    enzymeWrapper.setProps({ anchorEl: anchor });
    enzymeWrapper.update();
    const newProps = enzymeWrapper.props();
    */
  });
});
