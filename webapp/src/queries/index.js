import gql from 'graphql-tag';

export const searchQuery = gql`
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

export const autoCompleteQuery = gql`
  query($query: String) {
    autoCompleteSearch(query: $query) {
      users {
        id
        firstName
        lastName
        properties {
          id
          street
          state
          city
          zip
          rent
        }
      }
      properties {
        id
        state
        street
        city
        zip
        rent
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export default {
  searchQuery,
  autoCompleteQuery,
};
