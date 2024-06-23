import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert('ResponseKind', [{
    name: 'John Doe',
    isBetaMember: false
  }], {});
}

export const down = async (queryInterface: QueryInterface) => {

  await queryInterface.bulkDelete('ResponseKind', {}, {});
}
