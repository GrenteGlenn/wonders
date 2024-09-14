
module.exports = {
   up: async(queryInterface) => {

    await queryInterface.bulkInsert('organizations', [{
      id: 1,
      status_id: 1,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
    await queryInterface.bulkInsert('organizations', [{
      id: 2,
      status_id: 2,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
    await queryInterface.bulkInsert('organizations', [{
      id: 3,
      status_id: 3,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('organizations', 'status_id');
    await queryInterface.bulkDelete('organizations', null, {});
  }
};
