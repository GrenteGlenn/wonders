import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
  await queryInterface.bulkInsert('Countries', [{
    name: 'France',
    code: 'FR',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});

  await queryInterface.bulkInsert('Countries', [{
    name: 'Italy',
    code: 'IT',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});

  await queryInterface.bulkInsert('Countries', [{
    name: 'Germany',
    code: 'DE',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
};

export const down = async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
  await queryInterface.bulkDelete('Countries', {}, {});
};