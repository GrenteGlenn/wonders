// Importer Axios et Faker
const axios = require('axios');
const { faker } = require('@faker-js/faker');
const dotenv = require('dotenv');

// Fonction pour générer des données d'utilisateur aléatoires
const generateRandomUser = require('./data_generator/register');
const AuthUser = require('./routes/auth');
let authUser = new AuthUser();
const UserUser = require('./routes/user');
let userUser = new UserUser();

// Charger les variables d'environnement
dotenv.config();

// Récupération de l'URL de base de l'API
const API_BASE_URL = process.env.API_BASE_URL;

let config = {
    headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
        // Autres en-têtes si nécessaire
    }
};

function formatTimeShort(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const millisecondsLeft = milliseconds % 1000;
    
    return `${seconds}s ${millisecondsLeft > 0 ? millisecondsLeft : ''}`;
}

// Fonction principale pour générer et envoyer 10 utilisateurs
async function registerMultipleUsers(count) {
    const startTime = performance.now();
    for (let i = 0; i < count; i++) {
        // Génération des données utilisateur
        const userData = generateRandomUser();

        // Enregistrement de l'utilisateur
        await authUser.register(userData, config, API_BASE_URL);

        // Connexion de l'utilisateur
        const user = await authUser.login(userData, config, API_BASE_URL);
        config.headers['Authorization'] = `Bearer ${user.token}`;
        
        // refresh du token
        //await authUser.refresh(config, API_BASE_URL);

        // Récupération de l'utilisateur
        await userUser.get_user(config, API_BASE_URL, user.userId);

        // Récupération de tous les utilisateurs
        await userUser.get_users(config, API_BASE_URL);
        
        // Mise à jour de l'utilisateur
        let userUpdateData = userData;
        userUpdateData.first_name = faker.person.lastName();
        await userUser.update_user(config, API_BASE_URL, user.userId, userData);
    }

    const endTime = performance.now();
    const timeDifference = endTime - startTime;
    console.log(`Temps d'exécution : ${formatTimeShort(timeDifference)}ms`);

    const timeperrequest = timeDifference / count;
    console.log(`Temps moyen par requête : ${formatTimeShort(timeperrequest)}ms`);
}

// Appel de la fonction pour enregistrer X utilisateurs aléatoires
registerMultipleUsers(1);
