const{ QueryInterface, Sequelize } = require('sequelize');
module.exports = {
async up (queryInterface) {
  await queryInterface.bulkInsert('ratings', [{
    rating: 1,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('ratings', [{
    rating: 2,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('ratings', [{
    rating: 3,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('ratings', [{
    rating: 4,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('ratings', [{
    rating: 5,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
},

async down (queryInterface) {
  await queryInterface.bulkDelete('ratings', {}, {});
}
};
