'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserQuizIAResults', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
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
      userAnswer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });

    await queryInterface.addConstraint('UserQuizIAResults', {
      type: 'foreign key',
      fields: ["userAnswer"],
      name: 'user_answer_id',
      references: {
        table: 'UserAnswers',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('UserQuizIAResults', 'user_answer_id');
    await queryInterface.dropTable('UserQuizIAResults');
  }
};