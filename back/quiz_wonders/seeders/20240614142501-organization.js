'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Organizations', [{
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      statusId: 1
    }], {});
    await queryInterface.bulkInsert('Organizations', [{
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      statusId: 1
    }], {});
    await queryInterface.bulkInsert('Organizations', [{
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      statusId: 1
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Organizations', null, {});
  }
};
