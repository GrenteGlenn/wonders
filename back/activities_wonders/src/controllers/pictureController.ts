import Picture from '../../models/picture';

export default class PictureController {
  async list() {
    return await Picture.findAll();
  }

  async one(id: number) {
    return await Picture.findByPk(id);
  }

  async new(data: { path: string }) {
    const picture = await Picture.create(data as never);
    return picture;
  }

  async update(id: number, path: string) {
    const picture = await Picture.findByPk(id);
    if (picture) {
      picture.path = path;
      await picture.save();
    }
    return picture;
  }

  async delete(id: number) {
    const picture = await Picture.findByPk(id);
    if (picture) {
      await picture.destroy();
    }
    return 'resource had been deleted';
  }
}
