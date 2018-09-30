import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Segment, Container, Pagination } from 'semantic-ui-react';

import SearchInput from '../SearchInput';
import Properties from '../Properties';

export class App extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    properties: PropTypes.shape({
      results: PropTypes.array.isRequired,
    }).isRequired,
    search: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    page: 1,
  }

  search = () => {
    const { query, page } = this.state;

    this.props.search({ query, page });
  }

  handleSearchSubmit = async (query) => {
    await this.setState({ query, page: 1 });

    this.search();
  }

  handlePageChange = async (e, data) => {
    await this.setState({ page: data.activePage });

    this.search();
  }

  render () {
    const { properties, loading } = this.props;
    const { pagination, results } = properties;

    return (
      <Segment vertical style={{ padding: '8em 0' }}>
        <Container>
          <h1>Properties Search</h1>
          <SearchInput onSubmit={this.handleSearchSubmit}/>
          <Properties list={results} loading={loading}/>
          { pagination && (
            <Segment vertical textAlign="center">
              <Pagination
                onPageChange={this.handlePageChange}
                activePage={pagination.page}
                totalPages={pagination.pageCount}
              />
              <div style={{ margin: '1em 0' }}>
                { pagination.rowCount } Results
              </div>
            </Segment>
          ) }
        </Container>
      </Segment>
    );
  }
}

const query = gql`
  query($query: String, $page: Int) {
    search(query: $query, page: $page) {
      results {
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
      pagination {
        page
        pageSize
        pageCount
        rowCount
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
    properties: data.search || {
      results: [],
    },
    search: data.refetch,
  }),
})(App);
