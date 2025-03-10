import swaggerAutogen from 'swagger-autogen';
import app from './src/app';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:3000',
  definition: {
    BodyFormatInvalid: 'Body Format Invalid',
    NoImage: 'No pays image.',
    CityNotFound: 'City Not Found',
    CountryNotFound: 'Country Not Found',
    LangueNotFound: 'Langue Not Found',
    CityDeleted: 'City deleted',
    CountryDeleted: 'Country deleted',
    LangueDeleted: 'Langue deleted',
    ImageAi: {
      type: 'string'
    },
    LangueArray: {
      type: 'array',
      items: {
        $ref: '#/definitions/Langue'
      }
    },
    Langue: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          description: 'The ID of the language',
          exemple: 1
        },
        name: {
          type: 'string',
          description: 'The name of the language',
          exemple: 'Français'
        },
        code: {
          type: 'string',
          description: 'Code of the language',
          exemple: 'FR'
        },
        created_at: {
          type: 'datetime',
          description: 'The created date of the element',
          exemple: 'Fri Feb 28 2025 14:32:46 GMT+0100'
        },
        updated_at: {
          type: 'datetime',
          description: 'The updated date of the element',
          exemple: 'Fri Feb 28 2025 14:32:46 GMT+0100'
        }
      }
    },
    CountryDescription:
      "D'après certain il y a beaucoup d'arabe, noir et raciste dans ce pays.Il sont souvent en grève aussi.",
    CountryArray: {
      type: 'array',
      items: {
        $ref: '#/definitions/Country'
      }
    },
    Countries: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          description: 'The ID of the country',
          exemple: 1
        },
        name: {
          type: 'string',
          description: 'The name of the country',
          exemple: 'France'
        },
        code: {
          type: 'string',
          description: 'Code of the country',
          exemple: 'FR'
        },
        image: {
          type: 'string',
          description: 'Image of the country',
          exemple: 'www.LienDeLimage.com'
        },
        description: {
          type: 'string',
          description: 'Description of the country',
          exemple: `D'après certain il y a beaucoup d'arabe, noir et raciste dans ce pays.
          Il sont souvent en grève aussi.`
        },
        language: {
          type: 'number',
          description: 'Id of the language',
          exemple: 1
        },
        created_at: {
          type: 'datetime',
          description: 'The created date of the element',
          exemple: 'Fri Feb 28 2025 14:32:46 GMT+0100'
        },
        updated_at: {
          type: 'datetime',
          description: 'The updated date of the element',
          exemple: 'Fri Feb 28 2025 14:32:46 GMT+0100'
        }
      }
    },
    CityArray: {
      type: 'array',
      items: {
        $ref: '#/definitions/City'
      }
    },
    City: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          description: 'The ID of the city',
          exemple: 1
        },
        name: {
          type: 'string',
          description: 'The name of the city',
          exemple: 'Paris'
        },
        country: {
          type: 'string',
          description: 'The country where the city is',
          exemple: 'France'
        },
        created_at: {
          type: 'datetime',
          description: 'The created date of the element',
          exemple: 'Fri Feb 28 2025 14:32:46 GMT+0100'
        },
        updated_at: {
          type: 'datetime',
          description: 'The updated date of the element',
          exemple: 'Fri Feb 28 2025 14:32:46 GMT+0100'
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./src/app.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc).then(async () => {
  await app; // Your project's root file
});
