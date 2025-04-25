import Airport from '../../models/airport';
import AirportInterface from '../interfaces/AirportInterface';

export default class AirportController {
  async all() {
    return await Airport.findAll();
  }

  async one(id: number) {
    return await Airport.findByPk(id);
  }

  async create(data: AirportInterface) {
    const airport = await Airport.create(data);
    return airport;
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
