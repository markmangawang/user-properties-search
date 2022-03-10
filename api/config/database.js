const dotenv = require('dotenv');
const Sequelize = require('@sequelize/core');

const { Op } = Sequelize.Op;

dotenv.load();

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: 'user_properties_dev_db',
    host: '172.19.176.1',
    dialect: 'postgres',
    port: '5433',
    operatorsAliases: Op,
  },
  test: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: 'user_properties_test_db',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
    port: 5433,
    operatorsAliases: Sequelize.Op,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
  },
};

module.exports = config[env];
