'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('QuizLines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.TEXT
      },
      isRequired: {
        type: Sequelize.BOOLEAN
      },
      isText: {
        type: Sequelize.BOOLEAN
      },
      tag: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quiz: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
    await queryInterface.addConstraint('QuizLines', {
      type: "foreign key",
      fields: ["tag"],
      name: 'tag_id',
      references: {
        table: 'Tags',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint('QuizLines', {
      type: "foreign key",
      fields: ["quiz"],
      name: 'quiz_id',
      references: {
        table: 'Quizzes',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    // Remove constraints that depend on QuizLines in other tables
    await queryInterface.removeConstraint('UserAnswerQuestions', 'quiz_line_id');
    
    await queryInterface.removeConstraint('QuizLines', 'quiz_id');
    await queryInterface.removeConstraint('QuizLines', 'tag_id');
    await queryInterface.dropTable('QuizLines');
  }
};
