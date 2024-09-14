const{ QueryInterface, Sequelize } = require('sequelize');
module.exports = {
async up (queryInterface) {
  await queryInterface.bulkInsert('tags', [{
    name: 'type of vacation',
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('tags', [{
    name: 'duration',
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('tags', [{
    name: 'budget',
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('tags', [{
    name: 'shill or not',
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('tags', [{
    name: 'don\'t now',
    created_at: new Date(),
    updated_at: new Date()
  }], {});
},

async down (queryInterface) {
  await queryInterface.bulkDelete('tags', {}, {});
}
};
