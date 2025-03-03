'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('subjects', [
      {
        user_id: 1,        // Assurez-vous que cet user_id existe dans votre table Users
        title: 'Vacations in the Caribbean',
        content: 'A detailed discussion about different vacation destinations in the Caribbean.',
        topic: 1,          // Assurez-vous que cet topic_id existe dans votre table Topics
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        title: 'Budget Travel Tips',
        content: 'Tips and tricks for traveling on a budget without sacrificing comfort.',
        topic: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 3,
        title: 'The Best Beaches in Europe',
        content: 'An overview of the top beaches in Europe, ideal for sunbathing and relaxation.',
        topic: 2,          // Assurez-vous que cet topic_id existe dans votre table Topics
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 4,
        title: 'Solo Travel Experiences',
        content: 'Sharing personal experiences and insights for solo travelers.',
        topic: 3,          // Assurez-vous que cet topic_id existe dans votre table Topics
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 5,
        title: 'Luxury Resorts Around the World',
        content: 'A guide to the most luxurious resorts in the world.',
        topic: 4,          // Assurez-vous que cet topic_id existe dans votre table Topics
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
