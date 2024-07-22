
module.exports = {
up: async(queryInterface) => {

    await queryInterface.bulkInsert('quizzes', [{
      name: 'Cheap travel',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Fancy travel',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'Hard travel',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('quizzes', null, {});
  }
};
