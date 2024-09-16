
module.exports = {
  up: async(queryInterface) => {
  
      await queryInterface.bulkInsert('user_answers', [{
        quiz_response_id: 1,
        quiz_line_id: 1,
        quiz_answer_text_id: 1,
        boolean: false,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        quiz_response_id: 1,
        quiz_line_id: 1,
        quiz_answer_text_id: 1,
        boolean: false,
        created_at: new Date(),
        updated_at: new Date()
      }, {
        quiz_response_id: 1,
        quiz_line_id: 1,
        quiz_answer_text_id: 1,
        boolean: false,
        created_at: new Date(),
        updated_at: new Date()
      }], {});
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('user_answers', null, {});
    }
  };
  