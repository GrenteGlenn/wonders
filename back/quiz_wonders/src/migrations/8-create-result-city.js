'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ResultCities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      step: {
        type: Sequelize.INTEGER
      },
      startAt: {
        type: Sequelize.DATE
      },
      endAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userQuizIAResultCountry: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    });
    await queryInterface.addConstraint('ResultCities', {
      type: 'foreign key',
      fields: ["userQuizIAResultCountry"],
      name: 'user_quiz_ia_result_country',
      references: {
        table: 'UserQuizIAResultCountries',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ResultCities','user_quiz_ia_result_country')
    await queryInterface.dropTable('ResultCities');
  }
};