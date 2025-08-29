
module.exports = {
  up: async(queryInterface) => {

   await queryInterface.bulkInsert('trip_cities', [{
     trip_id: 2,
     transportation_id: 2,
     city_id: 15,
     created_at: new Date(),
     updated_at: new Date()
   }], {});
   await queryInterface.bulkInsert('trip_cities', [{
    trip_id: 1,
    transportation_id: 1,
    city_id: 15,
    created_at: new Date(),
    updated_at: new Date()
   }], {});
   await queryInterface.bulkInsert('trip_cities', [{
    trip_id: 2,
    transportation_id: 3,
    city_id: 15,
    created_at: new Date(),
    updated_at: new Date()
   }], {});

 },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.removeColumn('trip_cities', 'transportation_id');
   await queryInterface.bulkDelete('trip_cities', null, {});
 }
};
