'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrganizationUrls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.TEXT
      },
      organization: {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('OrganizationUrls', {
      type: 'foreign key',
      fields: ["organization"],
      name: 'organization_id',
      references: {
        table: 'Organizations',
        field: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
      allowNull: false,
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('OrganizationUrls', 'organization_id');
    await queryInterface.dropTable('OrganizationUrls');
  }
};