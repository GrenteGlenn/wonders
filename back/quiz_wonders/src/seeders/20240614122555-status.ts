const  {QueryInterface}  = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Statuses', [{
      name: 'Done',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Awaiting',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'In progress',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Statuses', {}, {});
  }
};
