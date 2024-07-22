'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quiz_line_answers', {
      quiz_line: {
          type: Sequelize.INTEGER,
          references: {
            model: 'quiz_lines',
            key: 'id'
          },
      },
      quiz_answer_text: {
          type: Sequelize.INTEGER,
          references: {
            model: 'quiz_answer_texts',
            key: 'id'
          },
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('quiz_line_answers');
  }
};