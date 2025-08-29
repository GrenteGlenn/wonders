module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'trip_hotels',
      [
        {
          trip_city_id: 1,
          name: 'Hotel Sunshine',
          from: new Date('2024-01-01'),
          to: new Date('2024-01-05'),
          price: 150.0,
          url: 'https://example.com/hotel-sunshine',
          adults: 2,
          children: 0,
          longitude: 15.7876,
          latitude: 7.6976,
          status: 'EnAttenteDeReservation',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          trip_city_id: 2,
          name: 'Hotel Moonlight',
          from: new Date('2024-02-01'),
          to: new Date('2024-02-06'),
          price: 200.0,
          url: 'https://example.com/hotel-moonlight',
          adults: 2,
          children: 0,
          longitude: 15.7876,
          latitude: 7.6976,
          status: 'EnAttenteDeReservation',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          trip_city_id: 3,
          name: 'Hotel Starlight',
          from: new Date('2024-03-01'),
          to: new Date('2024-03-07'),
          price: 180.0,
          url: 'https://example.com/hotel-starlight',
          adults: 2,
          children: 0,
          longitude: 15.7876,
          latitude: 7.6976,
          status: 'EnAttenteDeReservation',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('trip_hotels', null, {});
  }
};
