'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Statuses', [{
        id: 1,
        name: 'Done',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

      await queryInterface.bulkInsert('Statuses', [{
        id: 2,
        name: 'Awaiting',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

      await queryInterface.bulkInsert('Statuses', [{
        id: 3,
        name: 'In progress',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Statuses', null, {});
  }
};
