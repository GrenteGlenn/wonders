'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Bulk insert for 'Quizzes'
    await queryInterface.bulkInsert('Quizzes', [{
      id: 1,
      name: 'Cheap travel',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: 2,
      name: 'Fancy travel',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      name: 'Hard travel',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Quizzes', null, {});
  }
};
