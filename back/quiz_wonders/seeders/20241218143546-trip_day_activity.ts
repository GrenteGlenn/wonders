
module.exports = {
  up: async(queryInterface) => {

   await queryInterface.bulkInsert('trip_day_activities', [{
     id: 1,
     trip_day_id: 2,
     activity_id: 44,
     created_at: new Date(),
     updated_at: new Date()
   }], {});
   await queryInterface.bulkInsert('trip_day_activities', [{
    id: 2,
    trip_day_id: 2,
    activity_id: 17,
    created_at: new Date(),
    updated_at: new Date()
   }], {});
   await queryInterface.bulkInsert('trip_day_activities', [{
    id: 3,
    trip_day_id: 1,
    activity_id: 22,
    created_at: new Date(),
    updated_at: new Date()
   }], {});

 },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.removeColumn('trip_day_activities', 'trip_city_id');
   await queryInterface.bulkDelete('trip_day_activities', null, {});
 }
};
