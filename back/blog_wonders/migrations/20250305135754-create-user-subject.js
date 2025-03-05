'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    await queryInterface.addConstraint('user_subjects', {
      type: "foreign key",
      fields: ["subject_id"],
      name: 'subject',
      references: {
        table: 'subjects',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeConstraint('user_subjects', 'subject');
    } catch (error) {
      console.warn('Constraint not found')
    }
    await queryInterface.dropTable('user_subjects');
  }
};