
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'trip_days',
      [
        { id: 1, trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 2, trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 3, trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 4, trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 5, trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 6, trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 7, trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 8, trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 9, trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 10, trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 11, trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 12, trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 13, trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 14, trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 15, trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 16, trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 17, trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 18, trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 19, trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 20, trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 21, trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 22, trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 23, trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 24, trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 25, trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 26, trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 27, trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 28, trip_city_id: 2, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 29, trip_city_id: 3, date: new Date(), created_at: new Date(), updated_at: new Date() },
        { id: 30, trip_city_id: 1, date: new Date(), created_at: new Date(), updated_at: new Date() },
      ],
      {}
    );
  },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.removeColumn('trip_days', 'trip_city_id');
   await queryInterface.bulkDelete('trip_days', null, {});
 }
};
