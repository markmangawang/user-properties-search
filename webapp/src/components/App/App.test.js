import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from 'enzyme';

import App from './App';
import Properties from '../Properties';

describe('<App /> test', () => {
  test('Should render properties list in app', () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.find(Properties).length).toEqual(1);
  });

  test('Should render component', () => {
    const component = <App/>
      shallow(component);

    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
