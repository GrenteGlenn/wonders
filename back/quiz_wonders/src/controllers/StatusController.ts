import Status from '../models/status';

export default class StatusController {
  async list() {
    const status = await Status.findAll();
    console.log(status);

    return status;
  }

  async one(id: number) {
    const status = await Status.findByPk(id);
    return status;
  }

  async new(name: string) {
    const status = await Status.create({ name });
    return status;
  }

  async update(id: number, name: string) {
    const status = await Status.findByPk(id);
    if (status) {
      status.name = name;
      await status.save();
    }
    return status;
  }

  async remove(id: number) {
    const status = await Status.findByPk(id);
    if (status) {
      await status.destroy();
    }
    return status;
  }
}
