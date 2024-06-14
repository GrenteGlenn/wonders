'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Countries', [{
      name: 'France',
      code: 'FR',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Countries', [{
      name: 'Italy',
      code: 'IT',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Countries', [{
      name: 'Germany',
      code: 'DE',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Countries', null, {});

  }
};
