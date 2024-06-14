'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Statuses', [{
        name: 'Done',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

      await queryInterface.bulkInsert('Statuses', [{
        name: 'Awaiting',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

      await queryInterface.bulkInsert('Statuses', [{
        name: 'In progress',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Statuses', null, {});
  }
};
