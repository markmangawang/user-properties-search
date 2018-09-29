'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const properties = [];
    const min = 5;
    const max = 95;

    for(let i = 0; i < 100; i++) {
      properties.push({
        userId: Math.floor(Math.random() * (max - min + 1)) + min,
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip: faker.address.zipCode(),
        rent: faker.finance.amount(),
      });
    }

    return queryInterface.bulkInsert('properties', properties, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('properties', null, {});
  }
};
