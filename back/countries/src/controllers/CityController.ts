import City from '../../models/city';
import Country from '../../models/country';

class CityController {
  async list() {
    const countries = await City.findAll({
        include: [
            {
                model: Country,
                as: 'ctry'
            }
        ]
  });
    return countries;
  }

  async one(id: number) {
    const city = await City.findByPk(id);
    return city;
  }

  async new(name: string, country: number, created_at: Date, updated_at: Date) {
    const city = await City.create({ name, country, created_at, updated_at });
    return city;
  }

  async update(id: number, name: string, country: number, created_at: Date, updated_at: Date,) {
    const city = await City.findByPk(id);
    if (city) {
      city.name = name;
      city.country = country;
      await city.save();
    }
    return city;
  }

  async remove(id: number) {
    const city = await City.findByPk(id);
    if (city) {
      await city.destroy();
    }
    return city;
  }
}

export default CityController;
