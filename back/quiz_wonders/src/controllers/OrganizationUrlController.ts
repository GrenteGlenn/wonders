import Organization from '../../models/organization';
import OrganizationUrl from '../../models/organizationurl';
import Status from '../../models/status';

export default class OrganizationUrlController {
  async list() {
    return await OrganizationUrl.findAll({
      include: [
        {
          model: Organization
        },
        {
          model: Status
        }
      ]
    });
  }

  async one(id: number) {
    return await OrganizationUrl.findByPk(id);
  }

  async create(
    url: string,
    organization_id: number,
    rank: number,
    partner: string,
    status_id: number,
    key: string,
    created_at: Date,
    updated_at: Date
  ) {
    const organizationUrl = await OrganizationUrl.create({
      url,
      organization_id,
      rank,
      partner,
      key,
      status_id,
      created_at,
      updated_at
    });
    return organizationUrl;
  }

  async update(
    id: number,
    url: string,
    organization_id: number,
    rank: number,
    partner: string,
    key?: string,
    status_id?: number
  ) {
    const organizationUrl = await OrganizationUrl.findByPk(id);

    if (organizationUrl) {
      organizationUrl.url = url;
      organizationUrl.organization_id = organization_id;
      organizationUrl.rank = rank;
      organizationUrl.partner = partner;
      organizationUrl.key = key!;
      organizationUrl.status_id = status_id!;

      await organizationUrl.save();
      return organizationUrl;
    } else {
      throw new Error('Organization URL not found');
    }
  }

  async delete(id: number) {
    const organizationUrl = await OrganizationUrl.findByPk(id);
    if (organizationUrl) {
      await organizationUrl.destroy();
    }
    return organizationUrl;
  }
}
