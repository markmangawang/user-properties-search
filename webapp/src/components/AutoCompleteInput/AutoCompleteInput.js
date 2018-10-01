import React from 'react';
import PropTypes from 'prop-types';
import { Search, Grid } from 'semantic-ui-react';

import { imageUrlFaker } from '../../utils/mocks';
import searchResultBuilder from '../../utils/searchResultBuilder';
import { USER_TYPE, PROPERTY_TYPE } from '../../utils/constants';
import debounce from '../../utils/debounce';

export default class AutoCompleteInput extends React.Component {
  static propTypes = {
    onResultSelect: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    results: PropTypes.shape({
      users: PropTypes.array.isRequired,
      properties: PropTypes.array.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.debouncedChangeHandler = debounce(this.autoCompleteSearch, 500);
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });

    this.props.onResultSelect(result);
  }

  autoCompleteSearch = (e) => {
    this.props.onSearchChange(e.target.value);
  }

  handleChange = (e) => {
    e.persist();

    this.setState({ value: e.target.value });

    this.debouncedChangeHandler(e);
  }

  buildResults = (results) => {
    const { users, properties } = results;

    const categories = [
      {
        key: USER_TYPE.KEY,
        name: USER_TYPE.NAME,
        results: users,
        resultBuilder: (user) => ({
          type: USER_TYPE.SINGLE_KEY,
          title: `${user.firstName} ${user.lastName}`,
          description: `${user.properties.length} Listing/s`,
          image: imageUrlFaker('face', user.id),
          properties: user.properties,
        }),
      },
      {
        key: PROPERTY_TYPE.KEY,
        name: PROPERTY_TYPE.NAME,
        results: properties,
        resultBuilder: (property) => ({
          type: PROPERTY_TYPE.SINGLE_KEY,
          title: property.street,
          description: `${property.city}, ${property.state}`,
          price: `$${property.rent}`,
          image: imageUrlFaker('house', property.id),
          user: property.user,
        }),
      },
    ];

    return searchResultBuilder(categories);
  }

  render() {
    const { loading, results } = this.props;
    const { value } = this.state;

    return (
      <Grid centered>
        <Grid.Column width={16}>
          <Search
            category
            loading={loading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleChange}
            results={this.buildResults(results)}
            value={value}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
