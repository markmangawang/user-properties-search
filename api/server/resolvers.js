const resolvers = {
  Query: {
    search: (parent, { query }, { models }) => {
      const ILIKE = models.Sequelize.Op.iLike;

      return models.Property.findAll({
        where: {
          $or: [
            { street: { [ILIKE]: `%${query}%` } },
            { city: { [ILIKE]: `%${query}%` } },
            { state: { [ILIKE]: `%${query}%` } },
            { '$user.firstName$': { [ILIKE]: `%${query}%` } },
            { '$user.lastName$': { [ILIKE]: `%${query}%` } },
          ],
        },
        include: [
          {
            model: models.User,
            as: 'user',
          },
        ],
      });
    },
  },
};

export default resolvers;
