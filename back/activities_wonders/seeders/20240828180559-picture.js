const{ QueryInterface, Sequelize } = require('sequelize');
module.exports = {
async up (queryInterface) {
  await queryInterface.bulkInsert('pictures', [{
    path: 'https://picsum.photos/200/300',
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('pictures', [{
    path: 'https://picsum.photos/200/300',
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('pictures', [{
    path: 'https://picsum.photos/200/300',
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('pictures', [{
    path: 'https://picsum.photos/200/300',
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('pictures', [{
    path: 'https://picsum.photos/200/300',
    created_at: new Date(),
    updated_at: new Date()
  }], {});
},

async down (queryInterface) {
  await queryInterface.bulkDelete('pictures', {}, {});
}
};
