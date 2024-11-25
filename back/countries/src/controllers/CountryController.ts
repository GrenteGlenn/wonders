import Country from '../../models/country';
import Language from '../../models/language';
import OpenAiService from '../services/openai';

interface Data {
  result: string;
}

class CountryController {
  async getDataFromOpenAI(prompt: string) {
    return await OpenAiService.openaiCall(prompt);
  }

  async list() {
    const countries = await Country.findAll({
      include: [
        {
          model: Language,
          as: 'lang',
          attributes: ['id', 'name', 'code']
        }
      ]
    });
    return countries;
  }

  async one(id: number) {
    const now = Date.now();
    const country = await Country.findByPk(id, {
      include: [
        {
          model: Language,
          as: 'lang',
          attributes: ['id', 'name', 'code']
        }
      ]
    });
    if (country) {
      let diffDays;
      if (typeof country.updated_at_description === 'number')
        diffDays = Math.floor(Math.abs(country.updated_at_description - now) / (1000 * 60 * 60 * 24));
      if (diffDays !== undefined && diffDays > 29) {
        const res = await this.getDataFromOpenAI(country.name);
        if (res) {
          country.description = res as unknown as Text;
          country.updated_at_description = new Date();
          await country.save();
        }
      }
      console.log(diffDays);
    }
    return country;
  }

  async getCountryDescription(id: number) {
    const country = await Country.findByPk(id);

    if (country) {
      return country.getDescription;
    } else {
      return null;
    }
  }

  async new(
    name: string,
    code: string,
    description: Text,
    image: string,
    language: number,
    created_at: Date,
    updated_at: Date
  ) {
    const country = await Country.create({ name, code, description, image, language, updated_at });
    return country;
  }

  async update(id: number, name: string, code: string, description: Text, image: string, language: number) {
    const country = await Country.findByPk(id);
    if (country) {
      country.name = name;
      country.code = code;
      country.description = description;
      country.image = image;
      country.language = language;
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
