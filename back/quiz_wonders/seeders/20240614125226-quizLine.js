'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('QuizLines', [{
      id: 1,
      question: 'How long will you travel ?',
      isBoolean: false,
      isText: true,
      quizId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      id: 2,
      question: 'How much will you spend during your trip',
      isBoolean: false,
      isText: true,
      quizId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      id: 3,
      question: 'What types of places you like ?',
      isBoolean: false,
      isText: true,
      quizId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      id: 4,
      question: 'What kind of accommodation you prefer ? ',
      isBoolean: false,
      isText: true,
      quizId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      id: 5,
      question: 'What kind of class you will get in plane ?',
      isBoolean: false,
      isText: true,
      quizId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      id: 6,
      question: 'How many different locations you will visit during your trip ?',
      isBoolean: false,
      isText: true,
      quizId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      id: 7,
      question: 'Will you tell us something that we need to know about your whishes ?',
      isBoolean: false,
      isText: true,
      quizId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('QuizLines', null, {});
  }
};
