'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_quiz_ia_result_countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      test: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      country: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    await queryInterface.addConstraint('user_quiz_ia_result_countries', {
      type: "foreign key",
      fields: ["country"],
      name: 'country',
      references: {
        table: 'countries',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_quiz_ia_result_countries','country')
    await queryInterface.dropTable('user_quiz_ia_result_countries');
  }
};