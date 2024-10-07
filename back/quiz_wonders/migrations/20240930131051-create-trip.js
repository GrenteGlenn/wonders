'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      country_id: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.INTEGER
      },
      transportation_id: {
        type: Sequelize.INTEGER
      },
      from: {
        type: Sequelize.DATE
      },
      to: {
        type: Sequelize.DATE
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

    await queryInterface.addConstraint('trips', {
      type: 'foreign key',
      fields: ["transportation_id"],
      name: 'transportation_id',
      references: {
        table: 'trip_transportations',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('trips', 'transportation_id');
    } catch (error) {
      console.warn('Constraint not found')
    }
    await queryInterface.dropTable('trips');
  }
};