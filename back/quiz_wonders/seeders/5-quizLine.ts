
module.exports = {
    up: async (queryInterface) => {
    await queryInterface.bulkInsert('quiz_lines', [{
      id: 1,
      question: 'A quelle frequence vous voyagez ?',
      is_boolean: false,
      step: 1,
      is_text: true,
      is_required: true,
      tag_id: 1,
      quiz_id: 2,
      response_kind_id:3,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('quiz_lines', [{
      id: 2,
      question: 'How much will you spend during your trip',
      is_boolean: false,
      step: 2,
      is_text: true,
      is_required: true,
      tag_id: 1,
      quiz_id: 2,
      response_kind_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('quiz_lines', [{
      id: 3,
      question: 'What types of places you like ?',
      is_boolean: false,
      step: 3,
      is_text: true,
      is_required: true,
      tag_id: 1,
      quiz_id: 3,
      response_kind_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('quiz_lines', [{
      id: 4,
      question: 'What kind of accommodation you prefer ? ',
      is_boolean: false,
      step: 4,
      is_text: true,
      is_required: true,
      tag_id: 1,
      quiz_id: 2,
      response_kind_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('quiz_lines', [{
      id: 5,
      question: 'What kind of class you will get in plane ?',
      is_boolean: false,
      step: 5,
      is_text: true,
      is_required: true,
      tag_id: 1,
      quiz_id: 2,
      response_kind_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {
    });
    await queryInterface.bulkInsert('quiz_lines', [{
      id: 6,
      question: 'How many different locations you will visit during your trip ?',
      is_boolean: false,
      step: 6,
      is_text: true,
      is_required: true,
      quiz_id: 2,
      response_kind_id: 2,
      tag_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
    await queryInterface.bulkInsert('quiz_lines', [{
      id: 7,
      question: 'Will you tell us something that we need to know about your whishes ?',
      is_boolean: false,
      step: 7,
      is_text: true,
      is_required: true,
      tag_id: 1,
      quiz_id: 2,
      response_kind_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('quiz_lines', null, {});
  }
};
