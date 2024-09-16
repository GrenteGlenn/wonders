'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quizzes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tag_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });

    await queryInterface.addConstraint('quizzes', {
      type: "foreign key",
      fields: ["tag_id"],
      name: 'tag_id',
      references: {
        table: 'tags',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    })
  },
  async down(queryInterface, Sequelize) {
    
    await queryInterface.dropTable('quizzes');

  }
};