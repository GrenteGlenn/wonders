import Status from '../../models/status';

export default class StatusController {
  async list() {
    const status = await Status.findAll();
    return status;
  }

  async one(id: number) {
    const status = await Status.findByPk(id);
    return status;
  }

  async new(name: string, created_at: Date, updated_at: Date) {
    const status = await Status.create({ name, created_at, updated_at });
    return status;
  }

  async update(id: number, name: string, updated_at: Date) {
    const status = await Status.findByPk(id);
    if (status) {
      status.name = name;
      status.updated_at = updated_at;
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
