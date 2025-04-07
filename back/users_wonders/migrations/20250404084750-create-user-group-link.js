'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_group_links', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      user_group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_groups',
          key: 'id'
        },
      },
      is_owner: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      is_accepted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    // await queryInterface.removeConstraint('user-group-links', 'user_id')
    // await queryInterface.removeConstraint('user-group-links', 'user_group_id')
    await queryInterface.dropTable('user_group_links');
  }
};