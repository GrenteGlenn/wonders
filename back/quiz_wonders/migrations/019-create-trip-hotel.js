'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('trip_hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trip_city_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      from: {
        type: Sequelize.DATE
      },
      to: {
        type: Sequelize.DATE
      },
      url: {
        type: Sequelize.STRING
      },
      adults: {
        type: Sequelize.INTEGER
      },
      children: {
        type: Sequelize.INTEGER
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      latitude: {
        type: Sequelize.DOUBLE
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
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('trip_hotels', {
      type: 'foreign key',
      fields: ['trip_city_id'],
      name: 'trip_city',
      references: {
        table: 'trip_cities',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'NO ACTION'
    });
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('trip_hotels', 'trip_city_id');
    } catch (error) {
      console.warn('Constraint not found');
    }
    await queryInterface.dropTable('trip_hotels');
  }
};
