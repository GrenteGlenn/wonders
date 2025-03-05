'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('topics', [
      {
        country_id: 1,
        name: 'Tourism',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country_id: 2,
        name: 'Travel Tips',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country_id: 3,
        name: 'Cultural Experiences',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country_id: 4,
        name: 'Food and Cuisine',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country_id: 5,
        name: 'Adventure Travel',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('topics', null, {});
  }
};
