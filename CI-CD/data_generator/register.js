// Importation de la librairie faker
const { faker } = require('@faker-js/faker');

// Fonction pour générer des données d'utilisateur aléatoires en formdata
// function generateRandomUser() {
//     const formData = new FormData();
//     formData.append('first_name', faker.person.firstName());
//     formData.append('last_name', faker.person.lastName());
//     formData.append('email', faker.internet.email());
//     formData.append('birth_date', faker.date.betweens({ from: '1980-01-01T00:00:00.000Z', to: '2020-01-01T00:00:00.000Z', count: 1 }));
//     formData.append('password', faker.internet.password(16, false, /[A-Za-z0-9]/));
//     formData.append('language_id', 1);
//     formData.append('user_id', 1);
//     return formData;
// }

// Fonction pour générer des données d'utilisateur aléatoires en json
function generateRandomUser() {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        birth_date: faker.date.betweens({ from: '1980-01-01T00:00:00.000Z', to: '2020-01-01T00:00:00.000Z', count: 1 }),
        password: faker.internet.password(16, false, /[A-Za-z0-9]/),
        language_id: 1
    };
}

module.exports = generateRandomUser;