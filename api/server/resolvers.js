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

    autoCompleteSearch: async (parent, { query, limit = 10 }, { models }) => {
      const ILIKE = models.Sequelize.Op.iLike;

      const properties = await models.Property.findAll({
        where: {
          $or: [
            { street: { [ILIKE]: `%${query}%` } },
            { city: { [ILIKE]: `%${query}%` } },
            { state: { [ILIKE]: `%${query}%` } },
          ],
        },
        limit,
        include: [
          {
            model: models.User,
            as: 'user',
          },
        ],
      });

      const users = await models.User.findAll({
        where: {
          $or: [
            { firstName: { [ILIKE]: `%${query}%` } },
            { lastName: { [ILIKE]: `%${query}%` } },
            models.Sequelize.where(
              models.Sequelize.fn(
                'concat',
                models.Sequelize.col('firstName'),
                ' ',
                models.Sequelize.col('lastName'),
              ),
              { [ILIKE]: `%${query}%` },
            ),
          ],
        },
        limit,
        include: [
          {
            model: models.Property,
            as: 'properties',
          },
        ],
      });

      return { users, properties };
    },
  },
};

export default resolvers;
