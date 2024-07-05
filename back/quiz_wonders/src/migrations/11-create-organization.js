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
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });

    await queryInterface.addConstraint('Organizations', {
      type: 'foreign key',
      fields: ["statusId"],
      name: 'status_id',
      references: {
        table: 'Statuses',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Organizations', 'status_id_fk');
    await queryInterface.dropTable('Organizations');
  }
};
