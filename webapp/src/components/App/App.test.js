import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from 'enzyme';

import { Pagination } from 'semantic-ui-react';
import { App } from './App';
import Properties from '../Properties';
import AutoCompleteInput from '../AutoCompleteInput';
import User from '../User';

describe('<App /> test', () => {
  const props = {
    searchQueryProps: {
      loading: false,
      properties: {
        results: [],
        pagination: {
          page: 1,
          pageCount: 10,
          rowCount: 100,
        },
      },
    },
    autoCompleteQueryProps: {
      loading: false,
      results: {
        users: [],
        properties: [],
      },
    },
    search: jest.fn(),
    autoCompleteSearch: jest.fn(),
  }

  test('Should render properties list, search, pagination in app', () => {
    const wrapper = shallow(<App {...props}/>);

    expect(wrapper.find(Properties).length).toEqual(1);
    expect(wrapper.find(AutoCompleteInput).length).toEqual(1);
    expect(wrapper.find(Pagination).length).toEqual(1);
  });

  test('Should render user if activeUser exists', () => {
    const wrapper = shallow(<App {...props}/>);

    wrapper.setState({
      activeUser: {
        title: 'John Doe',
        image: 'https://loremflickr.com/320/240',
        properties: [],
      },
    });

    expect(wrapper.find(User).length).toEqual(1);
    expect(wrapper.find(Pagination).length).toEqual(0);
  });

  test('Should render component', () => {
    const component = <App {...props}/>
    shallow(component);

    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
