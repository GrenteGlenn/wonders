'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trip_cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trip_id: {
        type: Sequelize.INTEGER
      },
      city_id: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.INTEGER
      },
      transportation_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.addConstraint('trip_cities', {
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
    await queryInterface.addConstraint('trip_cities', {
      type: 'foreign key',
      fields: ["trip_id"],
      name: 'trip_id',
      references: {
        table: 'trips',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('trip_cities', 'transportation_id');
      await queryInterface.removeConstraint('trip_cities', 'trip_id');
    } catch (error) {
      console.warn('Constraint not found')
    }
    await queryInterface.dropTable('trip_cities');
  }
};