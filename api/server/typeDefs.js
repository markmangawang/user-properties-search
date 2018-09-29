import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    properties: [Property]
  }

  type Property {
    id: ID
    street: String
    city: String
    state: String
    zip: String
    rent: Float
    user: User
  }

  type Query {
    hello: String
    users: [User]
    properties: [Property]
  }
`;

export default typeDefs;
