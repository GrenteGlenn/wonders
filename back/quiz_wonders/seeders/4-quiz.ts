
module.exports = {
up: async(queryInterface) => {

    await queryInterface.bulkInsert('quizzes', [{
      name: 'Type of vacation',
      tag_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Pricing',
      tag_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Activities',
      tag_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('quizzes', null, {});
  }
};
