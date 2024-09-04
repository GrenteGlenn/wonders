'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('activity_category', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            picture_id: {
                type: Sequelize.INTEGER
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

        await queryInterface.addConstraint('activity_category', {
            type: "foreign key",
            fields: ["picture_id"],
            name: 'picture_id',
            references: {
                table: 'pictures',
                field: 'id',
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('activity_category', 'picture_id');
        await queryInterface.dropTable('activity_category');
    }
};