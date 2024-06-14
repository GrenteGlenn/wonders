'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('QuizLines', [{
      question: 'How long will you travel ?',
      isBoolean: false,
      isText: true,
      quizId: 36,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      question: 'How much will you spend during your trip',
      isBoolean: false,
      isText: true,
      quizId: 36,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      question: 'What types of places you like ?',
      isBoolean: false,
      isText: true,
      quizId: 36,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      question: 'What kind of accommodation you prefer ? ',
      isBoolean: false,
      isText: true,
      quizId: 36,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      question: 'What kind of class you will get in plane ?',
      isBoolean: false,
      isText: true,
      quizId: 36,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      question: 'How many different locations you will visit during your trip ?',
      isBoolean: false,
      isText: true,
      quizId: 36,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    await queryInterface.bulkInsert('QuizLines', [{
      question: 'Will you tell us something that we need to know about your whishes ?',
      isBoolean: false,
      isText: true,
      quizId: 36,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('QuizLines', null, {});
  }
};
