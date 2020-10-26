/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CodeTab } from './CodeTab';
import LIBRARIES from '../config/libraries';
import SAMPLES from '../config/samples';

Enzyme.configure({ adapter: new Adapter() });
global.open = jest.fn();

function setup() {
  const props = {
    classes: {
      main: 'abc',
      chip: 'def',
      cardRoot: 'ghi',
      headerRoot: 'jkl',
      headerContent: 'mno',
      cardContent: 'pqr',
      actionRoot: 'stu',
      selectors: 'vwx',
      sel: 'yza',
      selLink: 'bcd',
    },
    theme: {
      palette: {
        primary: {
          main: '#fff',
          contrastText: '#111',

        },
      },
    },
    selected: 'react',
    libraries: LIBRARIES,
    samples: SAMPLES,
    dispatch: jest.fn(),
  };

  const enzymeWrapper = mount(<CodeTab {...props} />);

  return { enzymeWrapper, props };
}

describe('Code Tab', () => {
  it('should render main Tab', () => {
    const { enzymeWrapper, props } = setup();
    expect(enzymeWrapper.find('#code-tab').hasClass('abc')).toBe(true);

    expect(props.dispatch.mock.calls.length).toBe(0);
    enzymeWrapper.find('div[data-test="node"]').simulate('click');
    expect(props.dispatch.mock.calls.length).toBe(1);

    props.dispatch.mockClear();
    expect(props.dispatch.mock.calls.length).toBe(0);
    enzymeWrapper.find('div[data-test="all"]').simulate('click');
    expect(props.dispatch.mock.calls.length).toBe(1);

    let button = enzymeWrapper.find('button').filterWhere((n) => n.text() === 'App').first();
    button.simulate('click');
    expect(window.open).toHaveBeenCalled();

    global.open.mockClear();
    button = enzymeWrapper.find('button').filterWhere((n) => n.text() === 'Api').first();
    button.simulate('click');
    expect(window.open).toHaveBeenCalled();

    global.open.mockClear();
    button = enzymeWrapper.find('button').filterWhere((n) => n.text() === 'Show Code').first();
    button.simulate('click');
    expect(window.open).toHaveBeenCalled();
  });
});
