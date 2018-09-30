import React from 'react';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import { mount } from 'enzyme';

import SearchInput from './SearchInput';

describe('<SearchInput /> test', () => {
  const onSubmit = jest.fn();

  test('Should update state on input change', () => {
    const wrapper = mount(<SearchInput onSubmit={onSubmit} />);

    const input = wrapper.find('input').first();

    input.simulate('change', { target: { value: 'John Doe' } });

    expect(wrapper.state().value).toEqual('John Doe');
  });

  test('Should call onSubmit prop on handleSubmit', () => {
    const onSubmitCallback = sinon.spy();
    const wrapper = mount(<SearchInput onSubmit={onSubmitCallback} />);

    const form = wrapper.find('form');
    form.simulate('submit');

    expect(onSubmitCallback.called).toBeTruthy();
  });

  test('Should render input', () => {
    const component = <SearchInput onSubmit={onSubmit} />;
    const wrapper = mount(component);

    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);

    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();

    expect(tree).toMatchSnapshot();
  });
});


