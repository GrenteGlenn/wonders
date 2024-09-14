const{ QueryInterface, Sequelize } = require('sequelize');
module.exports = {
async up (queryInterface) {
  await queryInterface.bulkInsert('reviews', [{
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    rating_id: 1,
    activity_id: 1,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('reviews', [{
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    rating_id: 1,
    activity_id: 1,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('reviews', [{
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    rating_id: 1,
    activity_id: 1,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('reviews', [{
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    rating_id: 1,
    activity_id: 1,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('reviews', [{
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    rating_id: 1,
    activity_id: 1,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
},

async down (queryInterface) {
  await queryInterface.bulkDelete('reviews', {}, {});
}
};
