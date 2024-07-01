'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ResultActivities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      test: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      resultCity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      activityId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    await queryInterface.addConstraint('ResultActivities', {
      type: 'foreign key',
      fields: ["resultCity"],
      name: 'result_city_id',
      references: {
        table: 'ResultCities',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ResultActivities','result_city_id')
    await queryInterface.dropTable('ResultActivities');
  }
};