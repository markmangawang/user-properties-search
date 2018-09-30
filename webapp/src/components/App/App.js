import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Segment, Container } from 'semantic-ui-react';

import SearchInput from '../SearchInput';
import Properties from '../Properties';

export class App extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    properties: PropTypes.array.isRequired,
    search: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    page: 1,
  }

  handleSearchSubmit = (query) => {
    this.setState({ query });

    this.props.search({ query, page: this.state.page });
  }

  render () {
    const { properties, loading } = this.props;

    return (
      <Segment vertical style={{ padding: '8em 0' }}>
        <Container>
          <h1>Properties Search</h1>
          <SearchInput onSubmit={this.handleSearchSubmit}/>
          <Properties properties={properties} loading={loading}/>
        </Container>
      </Segment>
    );
  }
}

const query = gql`
  query($query: String, $page: Int) {
    search(query: $query, page: $page) {
      id
      street
      city
      state
      zip
      rent
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

export default graphql(query, {
  options: (props) => ({
    variables: {
      query: '',
      page: 1,
    }
  }),
  props: ({ data }) => ({
    loading: data.loading,
    properties: data.search || [],
    search: data.refetch,
  }),
})(App);
