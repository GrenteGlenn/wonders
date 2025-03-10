'use strict';

const argon2 = require('argon2');  // Assure-toi d'importer argon2

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    try {
      // Hash du mot de passe avant insertion
      const hashedPassword = await encryptPassword('...'); // Remplace '...' par le mot de passe souhaité

      return queryInterface.bulkInsert('users', [
        {
          first_name: 'John',
          country_id: 1,
          last_name: 'Doe',
          email: 'example@example.com',
          password: hashedPassword, // Mot de passe haché
          created_at: new Date(),
          updated_at: new Date(),
          birth_date: new Date(),
          language_id: 1
        }
      ]);
    } catch (err) {
      console.error('Erreur lors du hachage du mot de passe', err);
      throw new Error('Erreur lors du hachage du mot de passe');
    }
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  }
};

// Fonction encryptPassword à définir en dehors de la migration ou dans un fichier séparé
async function encryptPassword(password) {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64MB de mémoire (recommandation de RFC 9106)
      timeCost: 3, // 3 itérations (recommandation de RFC 9106)
      parallelism: 4, // 4 threads (recommandation de RFC 9106)
      hashLength: 32 // Longueur du hash
    });
  } catch (err) {
    throw new Error('Erreur lors du hash du mot de passe');
  }
}
