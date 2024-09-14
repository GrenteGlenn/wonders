import ResponseKind from '../models/responsekind';

export default class ResponseKindController {
  async list() {
    return await ResponseKind.findAll();
  }

  async one(id: number) {
    return await ResponseKind.findByPk(id);
  }

  async new(type: string) {
    return await ResponseKind.create({ type: type });
  }

  async update(id: number, type: string) {
    const responseKind = await ResponseKind.findByPk(id);
    if (responseKind) {
      responseKind.type = type;
      await responseKind.save();
    }
    return responseKind;
  }

  async remove(id: number) {
    const responseKind = await ResponseKind.findByPk(id);
    if (responseKind) {
      await responseKind.destroy();
    }
    return responseKind;
  }
}
