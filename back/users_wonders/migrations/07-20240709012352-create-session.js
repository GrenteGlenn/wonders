'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valid: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    await queryInterface.addConstraint('sessions', {
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
    await queryInterface.dropTable('sessions');
  }
};
