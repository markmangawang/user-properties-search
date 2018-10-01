import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import { mount } from 'enzyme';

import AutoCompleteInput from './AutoCompleteInput';

describe('<AutoCompleteInput /> test', () => {
  const onResultSelect = jest.fn();
  const onSearchChange = jest.fn();

  const props = {
    onResultSelect,
    onSearchChange,
    results: {
      users: [],
      properties: [],
    }
  };

  test('Should update state on input change', () => {
    const wrapper = mount(<AutoCompleteInput {...props} />);

    const input = wrapper.find('input').first();

    input.simulate('change', { target: { value: 'John Doe' } });

    expect(wrapper.state().value).toEqual('John Doe');
  });

  test('Should render input', () => {
    const component = <AutoCompleteInput {...props} />;
    const wrapper = mount(component);

    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();

    expect(tree).toMatchSnapshot();
  });
});


