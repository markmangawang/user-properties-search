import React from 'react';
import renderer from 'react-test-renderer';
import { Card, Loader, Segment } from 'semantic-ui-react';

import { shallow, mount } from 'enzyme';

const properties = [
  {
    "id": "11",
    "street": "Wintheiser Gateway",
    "city": "Samirstad",
    "state": "South Carolina",
    "zip": "67045",
    "rent": 829.6,
    "user": {
      "id": "54",
      "firstName": "Lukas",
      "lastName": "Huels"
    }
  },
  {
    "id": "12",
    "street": "Braulio Cape",
    "city": "North Kristin",
    "state": "Vermont",
    "zip": "33846-6770",
    "rent": 629.33,
    "user": {
      "id": "17",
      "firstName": "Liliana",
      "lastName": "Wehner"
    }
  },
  {
    "id": "13",
    "street": "Javier Groves",
    "city": "Port Mallieton",
    "state": "Indiana",
    "zip": "44469-6898",
    "rent": 451.02,
    "user": {
      "id": "91",
      "firstName": "Arvid",
      "lastName": "Bailey"
    }
  },
];

import Properties from './Properties';

describe('<Properties /> test', () => {
  const props = {
    properties,
  };

  test('Should render list', () => {
    const wrapper = shallow(<Properties {...props}/>);

    expect(wrapper.find(Card).length).toEqual(3);
  });

  test('Should render loader', () => {
    const wrapper = shallow(<Properties {...props} loading={true}/>);

    expect(wrapper.find(Loader).length).toEqual(1);
  });

  test('Should render nothing found', () => {
    const wrapper = mount(<Properties properties={[]}/>);

    expect(wrapper.find(Segment).length).toEqual(1);
    expect(wrapper.find(Segment).text()).toEqual('No results found.');
  });

  test('Should render component', () => {
    const component = <Properties {...props}/>
      shallow(component);

    const renderedComponent = renderer.create(component);
    const tree = renderedComponent.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
