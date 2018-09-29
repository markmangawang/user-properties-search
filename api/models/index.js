import Sequelize from 'sequelize';
import config from '../config/database';

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const database = {
  sequelize,
  Sequelize,
  User: sequelize.import('./user'),
  Property: sequelize.import('./property'),
};

Object.keys(database).forEach((modelName) => {
  if ('associate' in database[modelName]) {
    database[modelName].associate(database);
  }
});

export default database;
