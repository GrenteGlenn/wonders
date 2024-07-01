import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('ResponseKind', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});
  },

  down: async (queryInterface) => {

    await queryInterface.bulkDelete('ResponseKind', {}, {});
  }
}
