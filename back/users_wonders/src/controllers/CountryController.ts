import Country from '../../models/country';

export default class CountryController {
  async list() {
    return await Country.findAll();
  }

  async getOne(id: number) {
    return await Country.findByPk(id);
  }

  async create(country: Country) {
    return await Country.create(country);
  }

  async update(country: Country) {
    return await Country.update({ name: country.name, code: country.code }, { where: { id: country.id } });
  }

  async delete(country: Country) {
    return await Country.destroy({ where: { id: country.id } });
  }
}
