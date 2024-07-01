const { QueryInterface, Sequelize } = require('sequelize');

module.exports = {
  up: async ( queryInterface) => {
    await queryInterface.bulkInsert('Countries', [{
      name: 'France',
      code: 'FR',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Italy',
      code: 'IT',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Germany',
      code: 'DE',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Countries', {}, {});
  }
};
