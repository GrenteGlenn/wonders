
module.exports = {
  up: async(queryInterface) => {

   await queryInterface.bulkInsert('trip_days', [{
     id: 1,
     trip_city_id: 2,
     date: new Date(),
     created_at: new Date(),
     updated_at: new Date()
   }], {});
   await queryInterface.bulkInsert('trip_days', [{
    id: 2,
    trip_city_id: 3,
    date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
   }], {});
   await queryInterface.bulkInsert('trip_days', [{
    id: 3,
    trip_city_id: 1,
    date: new Date(),
    created_at: new Date(),
    updated_at: new Date()
   }], {});

 },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.removeColumn('trip_days', 'trip_city_id');
   await queryInterface.bulkDelete('trip_days', null, {});
 }
};
