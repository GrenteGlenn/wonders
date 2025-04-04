'use strict';

const argon2 = require('argon2');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      const hashedPassword1 = await encryptPassword('...');
      const hashedPassword2 = await encryptPassword('password456');
      const hashedPassword3 = await encryptPassword('password789');
      const hashedPassword4 = await encryptPassword('password101112');
      const hashedPassword5 = await encryptPassword('password131415');

      return queryInterface.bulkInsert('users', [
        {
          first_name: 'John',
          country_id: 1,
          last_name: 'Doe',
          email: 'example@example.com',
          password: hashedPassword1,
          created_at: new Date(),
          updated_at: new Date(),
          birth_date: new Date('1990-01-01'),
          language_id: 1
        },
        {
          first_name: 'Jane',
          country_id: 1,
          last_name: 'Doe',
          email: 'jane.doe@example.com',
          password: hashedPassword2,
          created_at: new Date(),
          updated_at: new Date(),
          birth_date: new Date('1992-02-02'),
          language_id: 1
        },
        {
          first_name: 'Alice',
          country_id: 2,
          last_name: 'Smith',
          email: 'alice.smith@example.com',
          password: hashedPassword3,
          created_at: new Date(),
          updated_at: new Date(),
          birth_date: new Date('1985-03-03'),
          language_id: 2
        },
        {
          first_name: 'Bob',
          country_id: 3,
          last_name: 'Johnson',
          email: 'bob.johnson@example.com',
          password: hashedPassword4,
          created_at: new Date(),
          updated_at: new Date(),
          birth_date: new Date('1988-04-04'),
          language_id: 3
        },
        {
          first_name: 'Charlie',
          country_id: 1,
          last_name: 'Brown',
          email: 'charlie.brown@example.com',
          password: hashedPassword5, // Mot de passe haché
          created_at: new Date(),
          updated_at: new Date(),
          birth_date: new Date('1995-05-05'),
          language_id: 1
        }
      ], {});
    } catch (err) {
      console.error('Erreur lors du hachage du mot de passe', err);
      throw new Error('Erreur lors du hachage du mot de passe');
    }
  },

  async down(queryInterface) {
    // Annuler l'insertion en supprimant les utilisateurs
    return queryInterface.bulkDelete('users', null, {});
  }
};

// Fonction de hachage du mot de passe avec argon2
async function encryptPassword(password) {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64MB de mémoire
      timeCost: 3, // 3 itérations
      parallelism: 4, // 4 threads
      hashLength: 32 // Longueur du hash
    });
  } catch (err) {
    throw new Error('Erreur lors du hash du mot de passe');
  }
}
