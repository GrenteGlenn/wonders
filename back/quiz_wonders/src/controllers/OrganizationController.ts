import Organization from '../../models/organization';
import Status from '../../models/status';

export default class OrganizationController {
  async list() {
    return await Organization.findAll({
      include: [
        {
          model: Status,
          as: 'status'
        }
      ]
    });
  }

  async one(id: number) {
    return await Organization.findByPk(id);
  }

  async new(status_id: number, user_id: number, created_at: Date, updated_at: Date) {
    const organization = await Organization.create({ user_id, status_id, created_at, updated_at });
    return organization;
  }

  async update(id: number, user_id: number, status_id: number, updated_at: Date) {
    const organization = await Organization.findByPk(id);
    if (organization) {
      organization.user_id = user_id;
      organization.status_id = status_id;
      organization.updated_at = updated_at;
      await organization.save();
    }
    return organization;
  }

  async delete(id: number) {
    const organization = await Organization.findByPk(id);
    if (organization) {
      await organization.destroy();
    }
    return organization;
  }
}
