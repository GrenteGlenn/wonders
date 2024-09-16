

module.exports = {
  up: async(queryInterface) => {
  
      await queryInterface.bulkInsert('quiz_answer_texts', [{
        answer: 'Au moins 1 fois par an',
        quiz_line_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('quiz_answer_texts', [{
      answer: 'Entre 1 et 3 fois par an',
      quiz_line_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
    await queryInterface.bulkInsert('quiz_answer_texts', [{
      answer: 'Plus de 3 fois par an, j\'adore ca',
      quiz_line_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
    await queryInterface.bulkInsert('quiz_answer_texts', [{
      answer: 'Je suis constamment en voyage',
      quiz_line_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
    await queryInterface.bulkInsert('quiz_answer_texts', [{
      answer: 'Moins de 800 euros par semaine',
      quiz_line_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
    await queryInterface.bulkInsert('quiz_answer_texts', [{
      answer: 'Entre 800 et 1200 euros par semaine',
      quiz_line_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
    await queryInterface.bulkInsert('quiz_answer_texts', [{
      answer: 'Entre 1200 et 1500 euros par semaine',
      quiz_line_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
    await queryInterface.bulkInsert('quiz_answer_texts', [{
      answer: 'Plus de 1500 euros',
      quiz_line_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('quiz_answer_texts');
    }
  };