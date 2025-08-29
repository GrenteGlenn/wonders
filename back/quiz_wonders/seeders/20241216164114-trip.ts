
module.exports = {
  up: async(queryInterface) => {

   await queryInterface.bulkInsert('trips', [{
     user_id: 1,
     country_id: 1,
     duration: 15,
     from_date: new Date(),
     to_date: new Date(),
     transportation_id: 1,
     created_at: new Date(),
     updated_at: new Date(),
   }], {});
   await queryInterface.bulkInsert('trips', [{
    user_id: 1,
    country_id: 1,
    duration: 15,
    from_date: new Date(),
    to_date: new Date(),
    transportation_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
   }], {});
   await queryInterface.bulkInsert('trips', [{
    user_id: 1,
    country_id: 1,
    duration: 15,
    from_date: new Date(),
    to_date: new Date(),
    transportation_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
   }], {});

 },

 down: async (queryInterface, Sequelize) => {
   await queryInterface.removeColumn('trips', 'transportation_id');
   await queryInterface.bulkDelete('trips', null, {});
 }
};
