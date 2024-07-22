'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_answer_questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      answer: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_answer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quiz_line: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quiz_answer_text: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('user_answer_questions', {
      type: "foreign key",
      fields: ["quiz_line"],
      name: 'quiz_line',
      references: {
        table: 'quiz_lines',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    });
    await queryInterface.addConstraint('user_answer_questions', {
      type: "foreign key",
      fields: ["user_answer"],
      name: 'user_answer',
      references: {
        table: 'user_answers',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    });
    await queryInterface.addConstraint('user_answer_questions', {
      type: "foreign key",
      fields: ["quiz_answer_text"],
      name: 'quiz_answer_text',
      references: {
        table: 'quiz_answer_texts',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_answer_questions', 'quiz_line');
    await queryInterface.removeConstraint('user_answer_questions', 'user_answer');
    await queryInterface.removeConstraint('user_answer_questions', 'quiz_answer_text');
    await queryInterface.dropTable('user_answer_questions');
  }
};