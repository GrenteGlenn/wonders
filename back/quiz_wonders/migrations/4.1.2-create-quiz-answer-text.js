'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quiz_answer_texts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      answer: {
        type: Sequelize.TEXT
      },
      quiz_line_id: {
        type: Sequelize.INTEGER,
        allowNull: true
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

    await queryInterface.addConstraint('quiz_answer_texts', {
      type: "foreign key",
      fields: ["quiz_line_id"],
      name: 'quiz_line_id',
      references: {
        table: 'quiz_lines',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('quiz_answer_texts', 'quiz_line_id');
    await queryInterface.dropTable('quiz_answer_texts');
  }
};