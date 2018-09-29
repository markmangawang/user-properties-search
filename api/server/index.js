import { ApolloServer } from 'apollo-server';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import models from '../models';

const Server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
  },
});

export default Server;
