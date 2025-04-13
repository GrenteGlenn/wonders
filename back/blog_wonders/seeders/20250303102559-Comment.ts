'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('comments', [
      // Commentaires pour le sujet 1
      {
        message: 'Type of vacation, is this all-inclusive?',
        user_id: 1,  // Assurez-vous que ce user_id existe
        subject: 1,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Pricing seems a bit steep, any discounts?',
        user_id: 2,  // Assurez-vous que ce user_id existe
        subject: 1,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'What activities are available for kids?',
        user_id: 3,  // Assurez-vous que ce user_id existe
        subject: 1,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Is there a swimming pool on site?',
        user_id: 4,
        subject: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      // Commentaires pour le sujet 2
      {
        message: 'Can you explain the different pricing tiers?',
        user_id: 5,
        subject: 2,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'What’s included in the “luxury” package?',
        user_id: 6,
        subject: 2,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Are there group discounts available?',
        user_id: 7,
        subject: 2,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Do you offer flexible payment options?',
        user_id: 8,
        subject: 2,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },

      // Commentaires pour le sujet 3
      {
        message: 'What types of excursions do you offer?',
        user_id: 9,
        subject: 3,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Are pets allowed on excursions?',
        user_id: 10,
        subject: 3,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Can you arrange private excursions?',
        user_id: 11,
        subject: 3,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'I heard there’s a wine-tasting tour, is that true?',
        user_id: 12,
        subject: 3,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },

      // Commentaires pour le sujet 4
      {
        message: 'How many restaurants are there on the property?',
        user_id: 13,
        subject: 4,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Do you have vegetarian or vegan options?',
        user_id: 14,
        subject: 4,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Is there a dress code for the fine-dining restaurant?',
        user_id: 15,
        subject: 4,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'What time does dinner service end?',
        user_id: 16,
        subject: 4,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },

      // Commentaires pour le sujet 5
      {
        message: 'How can I book a room with a view?',
        user_id: 17,
        subject: 5,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Do you offer rooms with private balconies?',
        user_id: 18,
        subject: 5,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'Are there any special offers for honeymooners?',
        user_id: 19,
        subject: 5,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: 'What’s the check-in/check-out process like?',
        user_id: 20,
        subject: 5,  // Assurez-vous que ce subject existe
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    
    await queryInterface.bulkDelete('comments', null, {});
  }
};
