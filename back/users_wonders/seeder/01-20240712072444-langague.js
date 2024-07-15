'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Languages', [
      {
        name: 'John'
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Languages', null, {});
  }
};
