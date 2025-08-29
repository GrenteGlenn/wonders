module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'trip_days',
      [
        { trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('trip_days', 'trip_city_id');
    await queryInterface.bulkDelete('trip_days', null, {});
  }
};
