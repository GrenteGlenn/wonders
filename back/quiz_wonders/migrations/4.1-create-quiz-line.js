'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quiz_lines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.TEXT
      },
      is_required: {
        type: Sequelize.BOOLEAN
      },
      is_text: {
        type: Sequelize.BOOLEAN
      },
      is_boolean: {
        type: Sequelize.BOOLEAN
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quiz_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      response_kind_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    
    await queryInterface.addConstraint('quiz_lines', {
      type: "foreign key",
      fields: ["tag_id"],
      name: 'tag_id',
      references: {
        table: 'tags',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint('quiz_lines', {
      type: "foreign key",
      fields: ["response_kind_id"],
      name: 'response_kind_id',
      references: {
        table: 'response_kinds',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint('quiz_lines', {
      type: "foreign key",
      fields: ["quiz_id"],
      name: 'quiz_id',
      references: {
        table: 'quizzes',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    // Remove constraints that depend on QuizLines in other tables
    await queryInterface.removeConstraint('quiz_lines', 'quiz_id');
    await queryInterface.removeConstraint('quiz_lines', 'tag_id');
    await queryInterface.removeConstraint('quiz_lines', 'response_kind_id');
    await queryInterface.dropTable('quiz_lines');
  }
};
