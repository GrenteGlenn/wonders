'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('response_kinds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      // quiz_line_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      // }
    });
  },

  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('response_kinds');
  }
};