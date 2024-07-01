'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserAnswerQuestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      answer: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userAnswer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quizLine: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quizAnswerText: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
    await queryInterface.addConstraint('UserAnswerQuestions', {
      type: "foreign key",
      fields: ["quizLine"],
      name: 'quiz_line_id',
      references: {
        table: 'QuizLines',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    });
    await queryInterface.addConstraint('UserAnswerQuestions', {
      type: "foreign key",
      fields: ["userAnswer"],
      name: 'user_answer_id',
      references: {
        table: 'UserAnswers',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    });
    // await queryInterface.addConstraint('UserAnswerQuestions', {
    //   type: "foreign key",
    //   fields: ["quizLineText"],
    //   name: 'quiz_line_text_id',
    //   references: {
    //     table: 'QuizLineTexts',
    //     field: 'id',
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "NO ACTION",
    //   allowNull: false,
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('UserAnswerQuestions', 'quiz_line_id');
    await queryInterface.removeConstraint('UserAnswerQuestions', 'user_answer_id');
    await queryInterface.removeConstraint('UserAnswerQuestions', 'quiz_answer_text_id');
    await queryInterface.dropTable('UserAnswerQuestions');
  }
};