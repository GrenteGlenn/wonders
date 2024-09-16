'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'example@example.com',
        password: '...',
        created_at: new Date(),
        updated_at: new Date(),
        birth_date: new Date(),
        language_id: 1
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
