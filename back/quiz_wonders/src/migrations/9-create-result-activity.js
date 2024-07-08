'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('result_activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      test: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      result_city: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      activity_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    await queryInterface.addConstraint('result_activities', {
      type: 'foreign key',
      fields: ["result_city"],
      name: 'result_city',
      references: {
        table: 'result_cities',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('result_activities','result_city')
    await queryInterface.dropTable('result_activities');
  }
};