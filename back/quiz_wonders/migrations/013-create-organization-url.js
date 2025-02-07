'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organization_urls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rank: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      partner: {
        type: Sequelize.STRING,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false
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

    await queryInterface.addConstraint('organization_urls', {
      type: 'foreign key',
      fields: ["organization_id"],
      name: 'organization_id',
      references: {
        table: 'organizations',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
    await queryInterface.addConstraint('organization_urls', {
      type: 'foreign key',
      fields: ["status_id"],
      name: 'status_id',
      references: {
        table: 'statuses',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('organization_urls', 'organization_id');
    await queryInterface.removeConstraint('organization_urls', 'status_id');
    await queryInterface.dropTable('organization_urls');
  }
};
