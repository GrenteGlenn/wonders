const{ QueryInterface, Sequelize } = require('sequelize');
module.exports = {
async up (queryInterface) {
  await queryInterface.bulkInsert('activity_category', [{
    id: 1,
    name: 'Sports montagne',
    picture_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('activity_category', [{
    id: 2,
    name: 'Sports aquatiques',
    picture_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('activity_category', [{
    id: 3,
    name: 'Randonnées',
    picture_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('activity_category', [{
    id: 4,
    name: 'Auto - Moto',
    picture_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('activity_category', [{
    id: 5,
    name: 'Visites',
    picture_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
  await queryInterface.bulkInsert('activity_category', [{
    id: 6,
    name: 'Aerien',
    picture_id: 3,
    created_at: new Date(),
    updated_at: new Date()
  }], {});
},


async down (queryInterface) {
  await queryInterface.bulkDelete('activity_category', {}, {});
}
};
