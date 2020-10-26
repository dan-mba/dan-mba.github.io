/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SchoolTab } from './SchoolTab';

Enzyme.configure({ adapter: new Adapter() });
global.open = jest.fn();

function setup() {
  const props = {
    classes: {
      root: 'abc',
      media: 'def',
      card: 'ghi',
      cardContent: 'jkl',
      title: 'mno',
      subtitle: 'pqr',
      link: 'stu',
    },
  };

  const enzymeWrapper = mount(<SchoolTab {...props} />);

  return { enzymeWrapper, props };
}

describe('School Tab', () => {
  it('should render main Tab', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find({ container: true }).first().hasClass('abc')).toBe(true);
  });
});
