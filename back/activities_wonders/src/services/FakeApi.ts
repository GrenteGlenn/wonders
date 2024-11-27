// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment

import ActivityApiInterface from '../interfaces/activityApiInterface';

const data = require('./data.json');

/**
 * Convertit des degrés en radians
 * @param degrees - Valeur en degrés
 * @returns Valeur en radians
 */
function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calcule la boîte englobante (bounding box) pour un point donné
 * @param lat - Latitude du point central
 * @param lon - Longitude du point central
 * @param radius - Distance en km autour du point
 * @returns result - Array qui rentre dans la boite englobante
 */
export function fakeApi(lon: number, lat: number, radius: number) {
  const result: ActivityApiInterface[] = [];

  const delta_lat = radius / 111.0;
  const delta_lon = radius / (111.0 * Math.cos(degToRad(lat)));

  const min_lat = lat - delta_lat;
  const max_lat = lat + delta_lat;
  const min_lon = lon - delta_lon;
  const max_lon = lon + delta_lon;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  for (let i = 0; i < data.length; i++) {
    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data[i].latitude > min_lat &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data[i].latitude < max_lat &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data[i].longitude > min_lon &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data[i].longitude < max_lon
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
      result.push(data[i]);
    }
  }

  console.log('activity', { max_lat, min_lat, max_lon, min_lon }, result);

  return result;
}
