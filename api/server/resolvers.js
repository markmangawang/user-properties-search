const resolvers = {
  Query: {
    hello: () => 'Hello World',
    users: (parent, args, { models }) => models.User.findAll({
      include: [
        {
          model: models.Property,
          as: 'properties',
        },
      ],
    }),
    properties: (parent, args, { models }) => models.Property.findAll({
      include: [
        {
          model: models.User,
          as: 'user',
        },
      ],
    }),
  },
};

export default resolvers;
