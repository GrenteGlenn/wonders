
module.exports = {
  up: async (queryInterface) => {
    const airports = [
      {
        code: 'CDG',
        name: 'Aéroport de Paris-Charles-de-Gaulle',
        city_id: 1,
        latitude: 49.0097,
        longitude: 2.5479
      },
      {
        code: 'ORY',
        name: 'Aéroport de Paris-Orly',
        city_id: 1,
        latitude: 48.7262,
        longitude: 2.3652
      },
      {
        code: 'JFK',
        name: 'Aéroport international John-F.-Kennedy',
        city_id: 11,
        latitude: 40.6413,
        longitude: -73.7781
      },
      {
        code: 'LHR',
        name: 'Aéroport de Londres-Heathrow',
        city_id: 1,
        latitude: 51.47,
        longitude: -0.4543
      },
      {
        code: 'HND',
        name: 'Aéroport international de Tokyo-Haneda',
        city_id: 1,
        latitude: 35.5494,
        longitude: 139.7798
      },
      {
        code: 'SYD',
        name: 'Aéroport de Sydney',
        city_id: 1,
        latitude: -33.9399,
        longitude: 151.1753
      },
      {
        code: 'DXB',
        name: 'Aéroport international de Dubaï',
        city_id: 1,
        latitude: 25.2532,
        longitude: 55.3657
      },
      {
        code: 'GRU',
        name: 'Aéroport international de São Paulo-Guarulhos',
        city_id: 1,
        latitude: -23.4356,
        longitude: -46.4731
      },
      {
        code: 'PEK',
        name: 'Aéroport international de Pékin-Capitale',
        city_id: 1,
        latitude: 40.0799,
        longitude: 116.6031
      },
      {
        code: 'DEL',
        name: 'Aéroport international Indira-Gandhi',
        city_id: 1,
        latitude: 28.5562,
        longitude: 77.1
      },
      {
        code: 'IST',
        name: "Aéroport d'Istanbul",
        city_id: 1,
        latitude: 41.2606,
        longitude: 28.7425
      },
      {
        code: 'LAX',
        name: 'Aéroport international de Los Angeles',
        city_id: 12,
        latitude: 33.9416,
        longitude: -118.4085
      },
      {
        code: 'CPT',
        name: 'Aéroport international du Cap',
        city_id: 1,
        latitude: -33.9648,
        longitude: 18.6017
      },
      {
        code: 'YYZ',
        name: 'Aéroport international Toronto Pearson',
        city_id: 1,
        latitude: 43.6777,
        longitude: -79.6248
      },
      {
        code: 'SIN',
        name: 'Aéroport de Singapour-Changi',
        city_id: 1,
        latitude: 1.3644,
        longitude: 103.9915
      },
      {
        code: 'AMS',
        name: "Aéroport d'Amsterdam-Schiphol",
        city_id: 1,
        latitude: 52.3086,
        longitude: 4.7639
      },
      {
        code: 'FCO',
        name: 'Aéroport Léonard-de-Vinci de Rome Fiumicino',
        city_id: 1,
        latitude: 41.8003,
        longitude: 12.2389
      },
      {
        code: 'MAD',
        name: 'Aéroport Adolfo-Suárez de Madrid-Barajas',
        city_id: 1,
        latitude: 40.4983,
        longitude: -3.5676
      },
      {
        code: 'DMK',
        name: 'Aéroport international Don Mueang',
        city_id: 31,
        latitude: 13.9126,
        longitude: 100.607
      },
      {
        code: 'MEX',
        name: 'Aéroport international de Mexico',
        city_id: 1,
        latitude: 19.4361,
        longitude: -99.0719
      }
    ];

    await queryInterface.bulkInsert(
      'airports',
      airports.map((item) => ({
        name: item.name,
        code: item.code,
        city_id: item.city_id,
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
