module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('response_kinds', [{
      type: 'John Doe',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface) => {

    await queryInterface.bulkDelete('response_kinds', {}, {});
  }
}
