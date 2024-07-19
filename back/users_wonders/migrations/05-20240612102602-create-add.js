'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      complementary: {
        type: Sequelize.TEXT
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('addresses', {
      type: 'foreign key',
      fields: ['country_id'],
      name: 'country_id',
      references: {
        table: 'countries',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
      allowNull: false
    });
    await queryInterface.addConstraint('addresses', {
      type: 'foreign key',
      fields: ['user_id'],
      name: 'user_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
      allowNull: false
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('addresses');
  }
};
