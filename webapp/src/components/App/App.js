import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Segment, Container, Pagination } from 'semantic-ui-react';

import Properties from '../Properties';
import AutoCompleteInput from '../AutoCompleteInput';
import User from '../User';

import { searchQuery, autoCompleteQuery } from '../../queries';
import { USER_TYPE, PROPERTY_TYPE } from '../../utils/constants';

export class App extends React.Component {
  static propTypes = {
    searchQueryProps: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      properties: PropTypes.shape({
        results: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
    search: PropTypes.func.isRequired,

    autoCompleteQueryProps: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      results: PropTypes.shape({
        users: PropTypes.array.isRequired,
        properties: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
    autoCompleteSearch: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    page: 1,
    activeUser: null,
  }

  search = () => {
    const { query, page } = this.state;

    this.setState({ activeUser: null });

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

  handleAutoCompleteChange = async (query) => {
    if (!query) {
      await this.setState({ query: '', page: 1 });

      this.search();

      return;
    }

    this.props.autoCompleteSearch({ query });
  }

  handleAutoCompleteResultSelect = async (data) => {
    if (data.type === PROPERTY_TYPE.SINGLE_KEY) {
      await this.setState({ query: data.title, page: 1 });

      this.search();

      return;
    }

    if (data.type === USER_TYPE.SINGLE_KEY) {
      this.setState({ activeUser: data });
    }
  }

  render () {
    const { activeUser } = this.state;
    const { searchQueryProps, autoCompleteQueryProps } = this.props;
    const { properties, loading } = searchQueryProps;
    const { pagination, results } = properties;

    const list = activeUser ? activeUser.properties : results;

    return (
      <Segment vertical style={{ padding: '8em 0' }}>
        <Container>
          <h1>Properties Search</h1>
          <AutoCompleteInput
            loading={autoCompleteQueryProps.loading}
            results={autoCompleteQueryProps.results}
            onResultSelect={this.handleAutoCompleteResultSelect}
            onSearchChange={this.handleAutoCompleteChange}/>

          { activeUser && (
            <User
              listingsCount={activeUser.properties.length}
              image={activeUser.image}
              name={activeUser.title}/>
          ) }

          <Properties list={list} loading={loading}/>

          { !activeUser && pagination && (
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

const search = graphql(searchQuery, {
  options: (props) => ({
    variables: {
      query: '',
      page: 1,
    }
  }),
  props: ({ data }) => ({
    searchQueryProps: {
      loading: data.loading,
      properties: data.search || {
        results: [],
      },
    },
    search: data.refetch,
  }),
})

const autoComplete = graphql(autoCompleteQuery, {
  props: ({ data }) => ({
    autoCompleteQueryProps: {
      loading: data.loading,
      results: data.autoCompleteSearch || {
        users: [],
        properties: [],
      },
    },
    autoCompleteSearch: data.refetch,
  }),
});

export default compose(search, autoComplete)(App);
