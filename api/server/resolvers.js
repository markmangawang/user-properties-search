const { Op } = require('@sequelize/core');

const resolvers = {
  Query: {
    search: async (parent, { query, page = 1, pageSize = 12 }, { models }) => {
      const results = await models.Property.findAll({
        where: {
          [Op.or]: [
            { street: { [Op.iLike]: `%${query}%` } },
            { city: { [Op.iLike]: `%${query}%` } },
            { state: { [Op.iLike]: `%${query}%` } },
            { '$user.firstName$': { [Op.iLike]: `%${query}%` } },
            { '$user.lastName$': { [Op.iLike]: `%${query}%` } },
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
      const properties = await models.Property.findAll({
        where: {
          [Op.or]: [
            { street: { [Op.iLike]: `%${query}%` } },
            { city: { [Op.iLike]: `%${query}%` } },
            { state: { [Op.iLike]: `%${query}%` } },
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
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${query}%` } },
            { lastName: { [Op.iLike]: `%${query}%` } },
            models.Sequelize.where(
              models.Sequelize.fn(
                'concat',
                models.Sequelize.col('firstName'),
                ' ',
                models.Sequelize.col('lastName'),
              ),
              { [Op.iLike]: `%${query}%` },
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
