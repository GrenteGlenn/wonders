const{ QueryInterface, Sequelize } = require('sequelize');
module.exports = {
async up (queryInterface) {
  await queryInterface.bulkInsert('Tags', [{
    name: 'type of vacation',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('Tags', [{
    name: 'duration',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('Tags', [{
    name: 'budget',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('Tags', [{
    name: 'shill or not',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  await queryInterface.bulkInsert('Tags', [{
    name: 'don\'t now',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
},

async down (queryInterface) {
  await queryInterface.bulkDelete('Tags', {}, {});
}
};
