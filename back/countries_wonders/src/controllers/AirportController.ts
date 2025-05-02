import Airport from '../../models/airport';
import AirportInterface from '../interfaces/AirportInterface';
import { Op } from 'sequelize';

export default class AirportController {
  async all() {
    return await Airport.findAll();
  }

  async one(id: number) {
    return await Airport.findByPk(id);
  }

  async by_city(city_id: number) {
    return await Airport.findAll({ where: { city_id } });
  }

  async create(data: AirportInterface) {
    return await Airport.create(data);
  }

  async geo(longitude: number, latitude: number) {
    // rayon de recherche
    const radius = 10;

    const latDelta = radius / 111;
    const lonDelta = radius / (111 * Math.cos((latitude * Math.PI) / 180));

    const minLat = latitude - latDelta;
    const maxLat = latitude + latDelta;
    const minLon = longitude - lonDelta;
    const maxLon = longitude + lonDelta;

    return await Airport.findAll({
      where: {
        [Op.and]: [{ longitude: { [Op.between]: [minLon, maxLon] } }, { latitude: { [Op.between]: [minLat, maxLat] } }]
      }
    });
  }

  async update(id: number, data: AirportInterface) {
    console.log(data);

    const airport = await Airport.findByPk(id);
    if (!airport) throw new Error('Airport not found');
    const res = await airport.update(data);
    return res;
  }

  async delete(id: number) {
    const airport = await Airport.findByPk(id);
    if (!airport) throw new Error('Airport not found');
    await airport.destroy();
  }
}
