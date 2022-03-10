import Sequelize, { DataTypes } from '@sequelize/core';
import config from '../config/database';
import userModel from './user';
import propertyModel from './property';

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const database = {
  sequelize,
  Sequelize,
  User: userModel(sequelize, DataTypes),
  Property: propertyModel(sequelize, DataTypes),
};

Object.keys(database).forEach((modelName) => {
  if ('associate' in database[modelName]) {
    database[modelName].associate(database);
  }
});

export default database;
