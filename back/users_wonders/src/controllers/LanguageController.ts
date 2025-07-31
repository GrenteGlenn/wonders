import Language from '../../models/language';

export default class LanguageController {
  async list() {
    return await Language.findAll();
  }

  async getOne(id: number) {
    return await Language.findByPk(id);
  }

  async getByIds(ids: string[]) {
    return await Language.findAll({ where: { id: ids } });
  }

  async create(language: Language) {
    return await Language.create(language);
  }

  async update(language: Language) {
    return await Language.update({ name: language.name }, { where: { id: language.id } });
  }

  async delete(language: Language) {
    return await Language.destroy({ where: { id: language.id } });
  }
}
