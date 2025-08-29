
module.exports = {
    up: async (queryInterface) => {
    await queryInterface.bulkInsert('quiz_lines', [{
      question: 'A quelle frequence vous voyagez ?',
      is_boolean: false,
      step: 1,
      is_text: true,
      is_required: true,
      quiz_id: 2,
      response_kind_id:3,
      mutiple_type_answer: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('quiz_lines', [{
      question: 'How much will you spend during your trip',
      is_boolean: false,
      step: 2,
      parent: 1,
      is_text: true,
      is_required: true,
      quiz_id: 2,
      response_kind_id: 3,
      mutiple_type_answer: false,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('quiz_lines', [{
      question: 'What types of places you like ?',
      is_boolean: false,
      step: 3,
      parent: 1,
      is_text: true,
      is_required: true,
      quiz_id: 3,
      response_kind_id: 2,
      mutiple_type_answer: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('quiz_lines', [{
      question: 'What kind of accommodation you prefer ? ',
      is_boolean: false,
      step: 4,
      is_text: true,
      is_required: true,
      parent: 1,
      quiz_id: 2,
      response_kind_id: 2,
      mutiple_type_answer: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('quiz_lines', [{
      question: 'What kind of class you will get in plane ?',
      is_boolean: false,
      step: 5,
      is_text: true,
      is_required: true,
      quiz_id: 2,
      response_kind_id: 2,
      mutiple_type_answer: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {
    });
    await queryInterface.bulkInsert('quiz_lines', [{
      question: 'How many different locations you will visit during your trip ?',
      is_boolean: false,
      step: 6,
      is_text: true,
      quiz_id: 2,
      is_required: true,
      response_kind_id: 2,
      mutiple_type_answer: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('quiz_lines', [{
      question: 'Will you tell us something that we need to know about your whishes ?',
      is_boolean: false,
      step: 7,
      is_text: true,
      is_required: true,
      parent: 1,
      quiz_id: 2,
      response_kind_id: 2,
      mutiple_type_answer: false,
      created_at: new Date(),
      updated_at: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('quiz_lines', null, {});
  }
};
