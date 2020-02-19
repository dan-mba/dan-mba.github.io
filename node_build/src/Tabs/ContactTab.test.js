/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ContactTab } from './ContactTab';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    classes: {
      root: 'abc',
      card: 'def',
      body: 'ghi',
      img: 'jkl',
      content: 'mno',
      chipBox: 'pqr',
      chip: 'stu',
      link: 'vwx',
    },
  };

  const enzymeWrapper = shallow(<ContactTab {...props} />);

  return { enzymeWrapper, props };
}

describe('Contact Tab', () => {
  it('should render', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('#contact-tab').hasClass('abc')).toBe(true);
  });
});
