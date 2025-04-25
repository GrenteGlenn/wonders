import Localisation from '../../models/localisation';
import LocalisationInterface from '../interface/localisation';

export default class LocalisationController {
  async all() {
    return await Localisation.findAll();
  }

  async one(id: number) {
    return await Localisation.findByPk(id);
  }

  async create(data: LocalisationInterface) {
    return await Localisation.create(data);
  }

  async update(id: number, data: LocalisationInterface) {
    const localisation = await Localisation.findByPk(id);
    if (!localisation) throw new Error('Localisation not found');
    return await localisation.update(data);
  }

  async delete(id: number) {
    const localisation = await Localisation.findByPk(id);
    if (!localisation) throw new Error('Localisation not found');
    await localisation.destroy();
  }
}
