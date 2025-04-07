'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_groups', [
      {
        name: 'Trip to New Zeland',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Trip to Iceland',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Trip to Colombia',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_groups', null, {});
  }
};
