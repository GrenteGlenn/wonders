'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trip_day_activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trip_day_id: {
        type: Sequelize.INTEGER
      },
      activity_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM(
          'APayer',
          'EnAttenteDeReservation',
          'EnAttenteDeConfirmation',
          'ProblemeDeReservation',
          'Reserve',
          'Annuler'
        ),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
    });
    await queryInterface.addConstraint('trip_day_activities', {
      type: 'foreign key',
      fields: ["trip_day_id"],
      name: 'trip_day',
      references: {
        table: 'trip_days',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('trip_day_activities', 'trip_day_id');
    } catch (error) {
      console.warn('Constraint not found')
    }
    await queryInterface.dropTable('trip_day_activities');
  }
};