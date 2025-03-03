'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('topics', [
      {
        country_id: 1,  // Assurez-vous que cet ID de pays existe dans la table des pays
        name: 'Tourism',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country_id: 2,  // Assurez-vous que cet ID de pays existe dans la table des pays
        name: 'Travel Tips',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country_id: 3,  // Assurez-vous que cet ID de pays existe dans la table des pays
        name: 'Cultural Experiences',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country_id: 4,  // Assurez-vous que cet ID de pays existe dans la table des pays
        name: 'Food and Cuisine',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        country_id: 5,  // Assurez-vous que cet ID de pays existe dans la table des pays
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
