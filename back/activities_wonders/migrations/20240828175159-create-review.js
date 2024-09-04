'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('review', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      review: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      activity_id: {
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
    await queryInterface.addConstraint('review', {
        type: "foreign key",
        fields: ["activity_id"],
        name: 'activity_id',
        references: {
            table: 'activity',
            field: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    });
    await queryInterface.addConstraint('review', {
        type: "foreign key",
        fields: ["rating_id"],
        name: 'rating_id',
        references: {
            table: 'rating',
            field: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('review', 'activity_id');
    await queryInterface.removeConstraint('review', 'rating_id');
    await queryInterface.dropTable('review');
  }
};