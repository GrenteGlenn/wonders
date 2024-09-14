module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('response_kinds', [{
      type: 'Boolean',
      created_at: new Date(),
      updated_at: new Date()
    }

    ], {});
    await queryInterface.bulkInsert('response_kinds', [{
      type: 'Text',
      created_at: new Date(),
      updated_at: new Date()
    }

    ], {});
    await queryInterface.bulkInsert('response_kinds', [{
      type: 'Responses',
      created_at: new Date(),
      updated_at: new Date()
    }

    ], {});
  },

  down: async (queryInterface) => {

    await queryInterface.bulkDelete('response_kinds', {}, {});
  }
}
