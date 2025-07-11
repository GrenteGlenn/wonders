const { QueryInterface, Sequelize } = require('sequelize');
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'activity_categories',
      [
        {
          name: 'Sports montagne',
          picture_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'activity_categories',
      [
        {
          name: 'Sports aquatiques',
          picture_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'activity_categories',
      [
        {
          name: 'Randonnées',
          picture_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'activity_categories',
      [
        {
          name: 'Auto - Moto',
          picture_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'activity_categories',
      [
        {
          name: 'Visites',
          picture_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'activity_categories',
      [
        {
          name: 'Aerien',
          picture_id: 3,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('activity_categories', {}, {});
  }
};
