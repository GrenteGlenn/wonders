
module.exports = {
  up: async(queryInterface) => {
  
      await queryInterface.bulkInsert('quiz_responses', [{
        user_id: 1,
        quiz_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        user_id: 1,
        quiz_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        user_id: 1,
        quiz_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }], {});
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('quiz_responses', null, {});
    }
  };
  