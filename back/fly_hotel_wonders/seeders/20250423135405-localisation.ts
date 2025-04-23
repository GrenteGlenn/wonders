'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('localisations', [
      {
        lng: '2.3522',
        lat: '48.8566',
        country_id: 1,
        city_id: 101,
        city_name: 'Paris',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        lng: '-0.1276',
        lat: '51.5072',
        country_id: 2,
        city_id: 102,
        city_name: 'London',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        lng: '139.6917',
        lat: '35.6895',
        country_id: 3,
        city_id: 103,
        city_name: 'Tokyo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        lng: '-74.0060',
        lat: '40.7128',
        country_id: 4,
        city_id: 104,
        city_name: 'New York',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        lng: '151.2093',
        lat: '-33.8688',
        country_id: 5,
        city_id: 105,
        city_name: 'Sydney',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('localisations', null, {});
  }
};
