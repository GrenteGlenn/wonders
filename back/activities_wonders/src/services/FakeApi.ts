import ActivityApiInterface from '../interfaces/activityApiInterface';

import data from './data.json';

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

  for (let i = 0; i < data.length; i++) {
    if (
      data[i].latitude > min_lat &&
      data[i].latitude < max_lat &&
      data[i].longitude > min_lon &&
      data[i].longitude < max_lon
    ) {
      result.push({
        id: data[i].id,
        latitude: data[i].latitude,
        longitude: data[i].longitude,
        address: data[i].address,
        name: data[i].name,
        place_id: data[i].place_id,
        rating: data[i].rating,
        price_level: data[i].price_level,
        created_at: new Date(data[i].created_at),
        updated_at: new Date(data[i].updated_at)
      });
    }
  }


  return result;
}
