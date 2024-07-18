'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });

    await queryInterface.addConstraint('organizations', {
      type: 'foreign key',
      fields: ["status_id"],
      name: 'status_id',
      references: {
        table: 'statuses',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('organizations', 'status_id');
    await queryInterface.dropTable('organizations');
  }
};
