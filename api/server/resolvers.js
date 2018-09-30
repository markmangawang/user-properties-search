const resolvers = {
  Query: {
    search: async (parent, { query, page = 1, pageSize = 12 }, { models }) => {
      const ILIKE = models.Sequelize.Op.iLike;

      const results = await models.Property.findAll({
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

      const count = results.length;
      const pages = Math.ceil(count / pageSize);
      const offset = pageSize * (page - 1);

      return {
        results: results.slice(offset, offset + pageSize),
        pagination: {
          rowCount: count,
          pageCount: pages,
          page,
          pageSize,
        },
      };
    },
  },
};

export default resolvers;
