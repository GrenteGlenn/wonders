import City from '../../models/city';
import Country from '../../models/country';

class CityController {
  async list() {
    const city = await City.findAll({
      include: [
        {
          model: Country,
          as: 'country',
          attributes: ['id', 'name', 'code']
        }
      ]
    });
    return city;
  }

  async listId({ ids }: { ids: number[] }) {
    const city = await Country.findAll({
      where: {
        id: ids
      },
      attributes: {
        exclude: ['description', 'image', 'longitude', 'latitude', 'created_at', 'updated_at', 'updated_at_description']
      }
    });
    return city;
  }

  async getOneByName(name: string) {
    const city = await Country.findOne({ where: { name: name } });

    if (city) {
      return city;
    } else {
      return null;
    }
  }

  async one(id: number) {
    const city = await City.findByPk(id, {
      include: [
        {
          model: Country,
          as: 'country',
          attributes: ['id', 'name', 'code']
        }
      ]
    });
    return city;
  }

  async new(name: string, country_id: number, longitude: number, latitude: number, created_at: Date, updated_at: Date) {
    const country = await Country.findByPk(country_id);
    if (country) {
      return await City.create({ name, country_id: country_id, longitude, latitude, created_at, updated_at });
    } else {
      return null;
    }
  }

  async update(id: number, name: string, country_id: number, longitude: number, latitude: number) {
    const city = await City.findByPk(id);
    const country = await Country.findByPk(country_id);
    if (city && country) {
      city.name = name;
      city.country_id = country_id;
      city.longitude = longitude;
      city.latitude = latitude;
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
