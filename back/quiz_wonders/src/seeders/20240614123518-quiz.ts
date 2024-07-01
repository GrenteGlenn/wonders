const { QueryInterface, Sequelize } = require('sequelize');

module.exports = {
up: async(queryInterface) => {

    await queryInterface.bulkInsert('Quizzes', [{
      name: 'Cheap travel',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Fancy travel',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Hard travel',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Quizzes', null, {});
  }
};
