'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const userGroupLinks = [];
    for (let userId = 2; userId <= 4; userId++) {
      for (let groupId = 1; groupId <= 3; groupId++) {
        userGroupLinks.push({
          user_id: userId,
          user_group_id: groupId,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('user_group_links', userGroupLinks, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_group_links', null, {});
  }
};
