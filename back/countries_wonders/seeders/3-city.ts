module.exports = {
  up: async (queryInterface) => {
    const pays = [
      { name: 'Paris', country_id: 61, longitude: 2.3522, latitude: 48.8566 },
      { name: 'Marseille', country_id: 61, longitude: 5.3698, latitude: 43.2965 },
      { name: 'Lyon', country_id: 61, longitude: 4.8357, latitude: 45.75 },
      { name: 'Toulouse', country_id: 61, longitude: 1.4442, latitude: 43.6047 },
      { name: 'Nice', country_id: 61, longitude: 7.262, latitude: 43.7102 },
      { name: 'Nantes', country_id: 61, longitude: -1.5536, latitude: 47.2184 },
      { name: 'Strasbourg', country_id: 61, longitude: 7.7521, latitude: 48.5734 },
      { name: 'Montpellier', country_id: 61, longitude: 3.8767, latitude: 43.6111 },
      { name: 'Bordeaux', country_id: 61, longitude: -0.5792, latitude: 44.8378 },
      { name: 'Lille', country_id: 61, longitude: 3.0588, latitude: 50.6292 },
      { name: 'New York', country_id: 217, longitude: -74.006, latitude: 40.7128 },
      { name: 'Los Angeles', country_id: 217, longitude: -118.2437, latitude: 34.0522 },
      { name: 'Chicago', country_id: 217, longitude: -87.6298, latitude: 41.8781 },
      { name: 'Houston', country_id: 217, longitude: -95.3698, latitude: 29.7604 },
      { name: 'Phoenix', country_id: 217, longitude: -112.074, latitude: 33.4484 },
      { name: 'Philadelphia', country_id: 217, longitude: -75.1652, latitude: 39.9526 },
      { name: 'San Antonio', country_id: 217, longitude: -98.4936, latitude: 29.4241 },
      { name: 'San Diego', country_id: 217, longitude: -117.1611, latitude: 32.7157 },
      { name: 'Dallas', country_id: 217, longitude: -96.7969, latitude: 32.7767 },
      { name: 'San Jose', country_id: 217, longitude: -121.8863, latitude: 37.3382 },
      { name: 'Austin', country_id: 217, longitude: -97.7431, latitude: 30.2672 },
      { name: 'Jacksonville', country_id: 217, longitude: -81.6557, latitude: 30.3322 },
      { name: 'Fort Worth', country_id: 217, longitude: -97.3431, latitude: 32.7555 },
      { name: 'Columbus', country_id: 217, longitude: -82.9988, latitude: 39.9612 },
      { name: 'Indianapolis', country_id: 217, longitude: -86.158, latitude: 39.7684 },
      { name: 'Charlotte', country_id: 217, longitude: -80.8431, latitude: 35.2271 },
      { name: 'San Francisco', country_id: 217, longitude: -122.4194, latitude: 37.7749 },
      { name: 'Seattle', country_id: 217, longitude: -122.3321, latitude: 47.6062 },
      { name: 'Denver', country_id: 217, longitude: -104.9903, latitude: 39.7392 },
      { name: 'Washington, D.C.', country_id: 217, longitude: -77.0369, latitude: 38.9072 },
      { "name": "Bangkok", "country_id": 202, "longitude": 100.5167, "latitude": 13.7563 },
      { "name": "Chiang Mai", "country_id": 202, "longitude": 98.9795, "latitude": 18.7953 },
      { "name": "Phuket", "country_id": 202, "longitude": 98.2968, "latitude": 7.8804 },
      { "name": "Pattaya", "country_id": 202, "longitude": 100.8825, "latitude": 12.9296 },
      { "name": "Nakhon Ratchasima", "country_id": 202, "longitude": 102.1035, "latitude": 14.9750 },
      { "name": "Hua Hin", "country_id": 202, "longitude": 99.9560, "latitude": 12.5713 },
      { "name": "Ayutthaya", "country_id": 202, "longitude": 100.5683, "latitude": 14.3630 },
      { "name": "Chiang Rai", "country_id": 202, "longitude": 99.8336, "latitude": 19.9120 },
      { "name": "Krabi", "country_id": 202, "longitude": 98.9063, "latitude": 8.0863 },
      { "name": "Udon Thani", "country_id": 202, "longitude": 102.7854, "latitude": 17.4192 },
      { "name": "Sukhothai", "country_id": 202, "longitude": 99.8190, "latitude": 17.0012 },
      { "name": "Songkhla", "country_id": 202, "longitude": 100.5948, "latitude": 7.1990 },
      { "name": "Kanchanaburi", "country_id": 202, "longitude": 99.5321, "latitude": 14.0213 },
      { "name": "Samui", "country_id": 202, "longitude": 99.9455, "latitude": 9.5125 },
      { "name": "Surat Thani", "country_id": 202, "longitude": 99.1444, "latitude": 9.1407 },
      { "name": "Nakhon Si Thammarat", "country_id": 202, "longitude": 99.9633, "latitude": 8.4346 },
      { "name": "Mae Sot", "country_id": 202, "longitude": 98.5519, "latitude": 16.7156 },
      { "name": "Lampang", "country_id": 202, "longitude": 99.4909, "latitude": 18.2907 },
      { "name": "Phitsanulok", "country_id": 202, "longitude": 100.2584, "latitude": 16.8272 },
      { "name": "Chonburi", "country_id": 202, "longitude": 100.9737, "latitude": 13.3643 },
      {
        "name": "Bangkok",
        "country_id": 151,
        "longitude": 100.5167,
        "latitude": 13.7563
      },
      {
        "name": "Chiang Mai",
        "country_id": 151,
        "longitude": 98.9795,
        "latitude": 18.7883
      },
      {
        "name": "Pattaya",
        "country_id": 151,
        "longitude": 100.8823,
        "latitude": 12.9276
      },
      {
        "name": "Phuket",
        "country_id": 151,
        "longitude": 98.3044,
        "latitude": 7.8804
      },
      {
        "name": "Hat Yai",
        "country_id": 151,
        "longitude": 100.3927,
        "latitude": 6.9927
      },
      {
        "name": "Nakhon Ratchasima",
        "country_id": 151,
        "longitude": 102.1017,
        "latitude": 14.9747
      },
      {
        "name": "Khon Kaen",
        "country_id": 151,
        "longitude": 102.8356,
        "latitude": 16.4344
      },
      {
        "name": "Udon Thani",
        "country_id": 151,
        "longitude": 102.7843,
        "latitude": 17.4136
      },
      {
        "name": "Chiang Rai",
        "country_id": 151,
        "longitude": 99.8305,
        "latitude": 19.9126
      },
      {
        "name": "Surat Thani",
        "country_id": 151,
        "longitude": 99.3439,
        "latitude": 9.1064
      },
      {
        "name": "Nakhon Si Thammarat",
        "country_id": 151,
        "longitude": 99.9648,
        "latitude": 8.4287
      },
      {
        "name": "Roi Et",
        "country_id": 151,
        "longitude": 103.6427,
        "latitude": 16.0076
      },
      {
        "name": "Nakhon Phanom",
        "country_id": 151,
        "longitude": 104.7596,
        "latitude": 17.3821
      },
      {
        "name": "Samut Prakan",
        "country_id": 151,
        "longitude": 100.6010,
        "latitude": 13.5446
      },
      {
        "name": "Amnat Charoen",
        "country_id": 151,
        "longitude": 104.6506,
        "latitude": 15.8621
      },
      {
        "name": "Chonburi",
        "country_id": 151,
        "longitude": 100.9845,
        "latitude": 13.3628
      },
      {
        "name": "Sing Buri",
        "country_id": 151,
        "longitude": 100.3791,
        "latitude": 14.8991
      },
      {
        "name": "Sukhothai",
        "country_id": 151,
        "longitude": 99.8190,
        "latitude": 17.0070
      },
      {
        "name": "Prachuap Khiri Khan",
        "country_id": 151,
        "longitude": 99.7984,
        "latitude": 11.7801
      },
      {
        "name": "Mae Hong Son",
        "country_id": 151,
        "longitude": 97.9810,
        "latitude": 19.3034
      }
    ];

    await queryInterface.bulkInsert(
      'cities',
      pays.map((item) => ({
        name: item.name,
        country_id: item.country_id,
        longitude: item.longitude,
        latitude: item.latitude,
        created_at: new Date(),
        updated_at: new Date()
      })),
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('cities', {}, {});
  }
};
