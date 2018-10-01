import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import { mount } from 'enzyme';

import User from './User';

describe('<User /> test', () => {
  const props = {
    image: 'http://image.com',
    name: 'My Name',
    listingsCount: 0,
  };

  test('Should render user', () => {
    const component = <User {...props}/>;
    const wrapper = mount(component);

    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();

    expect(tree).toMatchSnapshot();
  });
});


