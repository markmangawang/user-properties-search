import { ApolloServer } from 'apollo-server';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const Server = new ApolloServer({ typeDefs, resolvers });

export default Server;
