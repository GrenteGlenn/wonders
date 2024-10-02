import { Client, Language, LatLng } from '@googlemaps/google-maps-services-js';

const client = new Client({});

const google_key = process.env.SECRET_KEY_GOOGLE_MAP;

export async function getGooglePlace() {
  if (typeof google_key !== 'string') {
    throw new Error('google_key not defined');
  }
  return await client
    .placesNearby({
      params: {
        key: google_key,
        language: 'fr' as Language,
        location: [45, -110] as LatLng,
        radius: 1000
      }
    })
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
}
