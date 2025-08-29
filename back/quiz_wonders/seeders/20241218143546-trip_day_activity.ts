module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'trip_day_activities',
      [
        { trip_day_id: 2, activity_id: 44, status: 'APayer', created_at: new Date(), updated_at: new Date() },
        {
          trip_day_id: 2,
          activity_id: 17,
          status: 'EnAttenteDeReservation',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          trip_day_id: 1,
          activity_id: 22,
          status: 'EnAttenteDeConfirmation',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          trip_day_id: 3,
          activity_id: 18,
          status: 'ProblemeDeReservation',
          created_at: new Date(),
          updated_at: new Date()
        },
        { trip_day_id: 4, activity_id: 9, status: 'Annuler', created_at: new Date(), updated_at: new Date() }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('trip_day_activities', 'trip_city_id');
    await queryInterface.bulkDelete('trip_day_activities', null, {});
  }
};
