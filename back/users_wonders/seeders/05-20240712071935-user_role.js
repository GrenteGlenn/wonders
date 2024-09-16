'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('user_roles', [
      {
        user_id: 1,
        role_id: 1
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('user_roles', null, {});
  }
};
