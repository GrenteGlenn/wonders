'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      quiz_answer_text_id : {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      quiz_line_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quiz_response_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      boolean: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });

    await queryInterface.addConstraint('user_answers', {
      type: "foreign key",
      fields: ["quiz_answer_text_id"],
      name: 'quiz_answer_text_id',
      references: {
        table: 'quiz_answer_texts',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint('user_answers', {
      type: "foreign key",
      fields: ["quiz_response_id"],
      name: 'quiz_response_id',
      references: {
        table: 'quiz_responses',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint('user_answers', {
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

    // await queryInterface.removeConstraint('user_answers', 'quiz_answer_text_id');
    // await queryInterface.removeConstraint('user_answers', 'quiz_response_id');
    // await queryInterface.removeConstraint('user_answers', 'quiz_line_id');
  
    await queryInterface.dropTable('user_answers');
}
}