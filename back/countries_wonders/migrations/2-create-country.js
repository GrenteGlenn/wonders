'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      longitude: {
        type: Sequelize.INTEGER,
      },
      latitude: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at_description: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('countries', {
      type: "foreign key",
      fields: ["language"],
      name: 'fk_language',
      references: {
        table: 'languages',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('cities', 'fk_cities_country');
      await queryInterface.removeConstraint('cities', 'fk_language');
    } catch (error) {
      console.warn('Constraint not found or already removed.');
    }
    await queryInterface.dropTable('countries');
  }
};
