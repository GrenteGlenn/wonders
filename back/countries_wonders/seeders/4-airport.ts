
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('airports', [
    {
      name: 'Los Angeles International Airport',
      code: 'LAX',
      city: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'John F. Kennedy International Airport',
      code: 'JFK',
      city: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Heathrow Airport',
      code: 'LHR',
      city: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Charles de Gaulle Airport',
      code: 'CDG',
      city: 4,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Tokyo Haneda Airport',
      code: 'HND',
      city: 5,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Dubai International Airport',
      code: 'DXB',
      city: 6,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Singapore Changi Airport',
      code: 'SIN',
      city: 7,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('airports', {}, {});
  }
};