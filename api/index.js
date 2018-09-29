import Server from './server';

Server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
