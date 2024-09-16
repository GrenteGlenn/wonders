
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('statuses', [{
      name: 'Done',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Awaiting',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'In progress',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('statuses', {}, {});
  }
};
