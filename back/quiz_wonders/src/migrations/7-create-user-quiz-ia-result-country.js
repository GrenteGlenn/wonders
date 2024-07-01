'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserQuizIAResultCountries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      test: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      country: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    await queryInterface.addConstraint('UserQuizIAResultCountries', {
      type: "foreign key",
      fields: ["country"],
      name: 'country_id',
      references: {
        table: 'Countries',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('UserQuizIAResultCountries','country_id')
    await queryInterface.dropTable('UserQuizIAResultCountries');
  }
};