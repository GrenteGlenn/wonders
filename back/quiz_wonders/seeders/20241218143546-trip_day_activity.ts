
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'trip_day_activities',
      [
        { id: 1, trip_day_id: 2, activity_id: 44, created_at: new Date(), updated_at: new Date() },
        { id: 2, trip_day_id: 2, activity_id: 17, created_at: new Date(), updated_at: new Date() },
        { id: 3, trip_day_id: 1, activity_id: 22, created_at: new Date(), updated_at: new Date() },
        { id: 4, trip_day_id: 3, activity_id: 18, created_at: new Date(), updated_at: new Date() },
        { id: 5, trip_day_id: 4, activity_id: 9, created_at: new Date(), updated_at: new Date() },
        { id: 6, trip_day_id: 5, activity_id: 15, created_at: new Date(), updated_at: new Date() },
        { id: 7, trip_day_id: 6, activity_id: 24, created_at: new Date(), updated_at: new Date() },
        { id: 8, trip_day_id: 7, activity_id: 8, created_at: new Date(), updated_at: new Date() },
        { id: 9, trip_day_id: 8, activity_id: 36, created_at: new Date(), updated_at: new Date() },
        { id: 10, trip_day_id: 9, activity_id: 14, created_at: new Date(), updated_at: new Date() },
        { id: 11, trip_day_id: 10, activity_id: 29, created_at: new Date(), updated_at: new Date() },
        { id: 12, trip_day_id: 11, activity_id: 7, created_at: new Date(), updated_at: new Date() },
        { id: 13, trip_day_id: 12, activity_id: 19, created_at: new Date(), updated_at: new Date() },
        { id: 14, trip_day_id: 13, activity_id: 33, created_at: new Date(), updated_at: new Date() },
        { id: 15, trip_day_id: 14, activity_id: 12, created_at: new Date(), updated_at: new Date() },
        { id: 16, trip_day_id: 15, activity_id: 4, created_at: new Date(), updated_at: new Date() },
        { id: 17, trip_day_id: 16, activity_id: 25, created_at: new Date(), updated_at: new Date() },
        { id: 18, trip_day_id: 17, activity_id: 31, created_at: new Date(), updated_at: new Date() },
        { id: 19, trip_day_id: 18, activity_id: 13, created_at: new Date(), updated_at: new Date() },
        { id: 20, trip_day_id: 19, activity_id: 30, created_at: new Date(), updated_at: new Date() },
        { id: 21, trip_day_id: 20, activity_id: 27, created_at: new Date(), updated_at: new Date() },
        { id: 22, trip_day_id: 21, activity_id: 21, created_at: new Date(), updated_at: new Date() },
        { id: 23, trip_day_id: 22, activity_id: 5, created_at: new Date(), updated_at: new Date() },
        { id: 24, trip_day_id: 23, activity_id: 16, created_at: new Date(), updated_at: new Date() },
        { id: 25, trip_day_id: 24, activity_id: 34, created_at: new Date(), updated_at: new Date() },
        { id: 26, trip_day_id: 25, activity_id: 3, created_at: new Date(), updated_at: new Date() },
        { id: 27, trip_day_id: 26, activity_id: 6, created_at: new Date(), updated_at: new Date() },
        { id: 28, trip_day_id: 27, activity_id: 26, created_at: new Date(), updated_at: new Date() },
        { id: 29, trip_day_id: 28, activity_id: 28, created_at: new Date(), updated_at: new Date() },
        { id: 30, trip_day_id: 29, activity_id: 20, created_at: new Date(), updated_at: new Date() },
      ],
      {}
    );
  },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.removeColumn('trip_day_activities', 'trip_city_id');
   await queryInterface.bulkDelete('trip_day_activities', null, {});
 }
};
