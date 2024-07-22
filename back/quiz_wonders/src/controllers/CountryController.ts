import Country from '../../models/country';

class CountryController {
  async list() {
    const countries = await Country.findAll();
    return countries;
  }

  async one(id: number) {
    const country = await Country.findByPk(id);
    return country;
  }

  async new(name: string, code: string) {
    const country = await Country.create({ name, code });
    return country;
  }

  async update(id: number, name: string, code: string) {
    const country = await Country.findByPk(id);
    if (country) {
      country.name = name;
      country.code = code;
      await country.save();
    }
    return country;
  }

  async remove(id: number) {
    const country = await Country.findByPk(id);
    if (country) {
      await country.destroy();
    }
    return country;
  }
}

export default CountryController;
