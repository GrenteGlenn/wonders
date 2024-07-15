'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Roles', [
      {
        role: 'User'
      },
      {
        role: 'Staff'
      },
      {
        role: 'Admin'
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
