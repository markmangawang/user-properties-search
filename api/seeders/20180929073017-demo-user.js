'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [];

    for(let i = 0; i < 100; i++) {
      users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      });
    }

    return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
