'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('airports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      latitude: {
        type: Sequelize.DOUBLE,
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

    await queryInterface.addConstraint('airports', {
      type: "foreign key",
      fields: ["city_id"],
      name: 'fk_city',
      references: {
        table: 'cities',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('airports', 'fk_city')
      await queryInterface.dropTable('airports');
    } catch (_) {
      throw new Error('no relations')
    }
  }
};