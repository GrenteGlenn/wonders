import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
  await queryInterface.bulkInsert('Tag', [{
    name: 'John Doe',
    isBetaMember: false
  }], {});
}

export const down = async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
  await queryInterface.bulkDelete('Tag', {}, {});
}
