
module.exports = {
   up: async(queryInterface) => {

    await queryInterface.bulkInsert('Organizations', [{
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      statusId: 1
    }], {});
    await queryInterface.bulkInsert('Organizations', [{
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      statusId: 1
    }], {});
    await queryInterface.bulkInsert('Organizations', [{
      id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      statusId: 1
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Organizations', null, {});
  }
};
