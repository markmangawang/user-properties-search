const resolvers = {
  Query: {
    search: (parent, { query, page = 1, pageSize = 10 }, { models }) => {
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
        offset: pageSize * (page - 1),
        limit: pageSize,
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
