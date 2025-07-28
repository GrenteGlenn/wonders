import Language from '../../models/language';

export default class LanguageController {
  async list() {
    const languages = await Language.findAll();
    return languages;
  }

  async one(id: number) {
    const language = await Language.findByPk(id);
    if (language) {
      return language;
    }
  }

  async create(name: string, code: string) {
    const language = await Language.create({ name: name, code: code, updated_at: new Date(), created_at: new Date() });
    return language;
  }

  async update(id: number, name: string, code: string, updated_at: Date) {
    const language = await Language.findByPk(id);
    if (language) {
      language.name = name;
      language.code = code;
      language.updated_at = updated_at;
      await language.save();
    }
    return language;
  }

  async delete(id: number) {
    const language = await Language.findByPk(id);
    if (language) {
      await language.destroy();
    }
    return language;
  }
}
