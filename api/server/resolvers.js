const properties = [
  {
    id: 1,
    street: 'Calle Pogi',
    city: 'Magic City',
    state: 'State College',
    zip: '1234',
    rent: 10,
  },
  {
    id: 2,
    street: 'Groove Street, Home',
    city: 'San Andreas',
    state: 'Alchemist',
    zip: '345546',
    rent: 100,
  },
  {
    id: 3,
    street: 'Molave St.',
    city: 'Davao City',
    state: 'Del sur',
    zip: '8000',
    rent: 5000,
  },
];

const resolvers = {
  Query: {
    hello: () => 'Hello World',
    users: (parent, args, { models }) => models.User.findAll(),
    properties: () => properties,
  },
};

export default resolvers;
