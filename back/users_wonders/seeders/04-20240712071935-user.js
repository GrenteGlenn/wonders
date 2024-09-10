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
        iv: '...',
        auth_tag: '...',
        birth_date: new Date(),
        language_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
