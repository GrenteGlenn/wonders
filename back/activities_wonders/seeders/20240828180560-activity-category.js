const{ QueryInterface, Sequelize } = require('sequelize');
module.exports = {
async up (queryInterface) {
  await queryInterface.bulkInsert('activity_category', [{
    name: 'Sports montagne',
    picture_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('activity_category', [{
    name: 'Sports aquatiques',
    picture_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('activity_category', [{
    name: 'Randonnées',
    picture_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('activity_category', [{
    name: 'Auto - Moto',
    picture_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('activity_category', [{
    name: 'Visites',
    picture_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
},

async down (queryInterface) {
  await queryInterface.bulkDelete('activity_category', {}, {});
}
};
