'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Organizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
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
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
    // await queryInterface.addConstraint('Organizations', {
    //   type: 'foreign key',
    //   fields: ["status"],
    //   name: 'status_id',
    //   references: {
    //     table: 'Status',
    //     field: 'id',
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "NO ACTION",
    //   allowNull: false,
    // })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Organizations', 'status_id');
    await queryInterface.dropTable('Organizations');
  }
};