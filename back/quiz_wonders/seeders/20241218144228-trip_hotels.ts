module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('trip_hotels', [
      {
        id: 1,
        trip_city_id: 1,
        name: "Hotel Sunshine",
        from: new Date('2024-01-01'),
        to: new Date('2024-01-05'),
        price: 150.00,
        url: "https://example.com/hotel-sunshine",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        trip_city_id: 2,
        name: "Hotel Moonlight",
        from: new Date('2024-02-01'),
        to: new Date('2024-02-06'),
        price: 200.00,
        url: "https://example.com/hotel-moonlight",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        trip_city_id: 3,
        name: "Hotel Starlight",
        from: new Date('2024-03-01'),
        to: new Date('2024-03-07'),
        price: 180.00,
        url: "https://example.com/hotel-starlight",
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('trip_hotels', null, {});
  }
};
