'use strict';

module.exports = {
  up: async (queryInterface) => {
    const subjectsLimit = 5;
    const entries = [];
    
    for (let i = 1; i <= 152; i++) {
      entries.push({
        user_id: (i % subjectsLimit) + 1,
        subject_id: 1
      });
    }

    for (let i = 1; i <= 11; i++) {
      entries.push({
        user_id: (i % subjectsLimit) + 1,
        subject_id: 2
      } );
    }
    for (let i = 1; i <= 125; i++) {
      entries.push({
        user_id: (i % subjectsLimit) + 1 as number,
        subject_id: 3
      });
    }
    for (let i = 1; i <= 73; i++) {
      entries.push({
        user_id: (i % subjectsLimit) + 1,
        subject_id: 4
      });
    }
    for (let i = 1; i <= 46; i++) {
      entries.push({
        user_id: (i % subjectsLimit) + 1,
        subject_id: 5
      });
    }
    

    await queryInterface.bulkInsert('user_subjects', entries, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_subjects', null, {});
  }
};
