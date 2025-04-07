/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userGroupLinks = [];
    
    for (let groupId = 1; groupId <= 3; groupId++) {
      const ownerUserId = groupId + 1;
      
      userGroupLinks.push({
        user_id: ownerUserId,
        user_group_id: groupId,
        is_accepted: true,
        is_owner: true,
        created_at: new Date(),
        updated_at: new Date()
      });
      
      for (let userId = 2; userId <= 4; userId++) {
        if (userId !== ownerUserId) {
          userGroupLinks.push({
            user_id: userId,
            user_group_id: groupId,
            is_accepted: Math.random() < 0.5,
            is_owner: false,
            created_at: new Date(),
            updated_at: new Date()
          });
        }
      }
    }
    
    await queryInterface.bulkInsert('user_group_links', userGroupLinks, {});
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_group_links', null, {});
  }
};