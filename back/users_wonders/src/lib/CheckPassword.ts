import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import * as crypto from 'node:crypto';

// Générer une clé de 256 bits (32 octets)
const key = crypto.randomBytes(32);

// Initialisation vector (IV) de 96 bits (12 octets) pour AES-GCM
const iv = crypto.randomBytes(12);

// Fonction pour check si le password est assez fort
export function checkPassword(password: string) {
  // set zxcvbn option
  const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary
    }
  };

  zxcvbnOptions.setOptions(options);

  return zxcvbn(password);
}

// Fonction pour chiffrer les password
export function encryptPassword(password: string) {
  // Créer un objet de chiffrement AES-256-GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  // Chiffrer les données
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Récupérer auth tag (pour l'authenticité)
  const authTag = cipher.getAuthTag().toString('hex');

  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
    auth_tag: authTag
  };
}

// Fonction pour déchiffrer les password
export function decryptPassword(
  encryptedData: string,
  ivHex:
    | WithImplicitCoercion<string>
    | {
        [Symbol.toPrimitive](hint: 'string'): string;
      },
  authTagHex: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 'string'): string }
) {
  const ivBuffer = Buffer.from(ivHex, 'hex');
  const authTagBuffer = Buffer.from(authTagHex, 'hex');

  // Créer un objet de déchiffrement AES-256-GCM
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, ivBuffer);
  decipher.setAuthTag(authTagBuffer);

  // Déchiffrer les données
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}
