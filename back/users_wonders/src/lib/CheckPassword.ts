import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnFrPackage from '@zxcvbn-ts/language-fr';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import argon2 from 'argon2';

// Fonction pour check si le password est assez fort
export function checkPassword(password: string) {
  // set zxcvbn option
  const options = {
    translations: zxcvbnFrPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
      ...zxcvbnFrPackage.dictionary
    },
    useLevenshteinDistance: true
  };

  zxcvbnOptions.setOptions(options);

  return zxcvbn(password);
}

// Fonction pour le hash du password
export async function encryptPassword(password: string) {
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

export async function decryptPassword(hash: string, password: string) {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    throw new Error('Erreur lors de la vérification du mot de passe');
  }
}
