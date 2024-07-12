import Organization from "../models/organization";
import OrganizationUrl from "../models/organizationurl";
import Status from "../models/status";
import UserAnswer from "../models/useranswer";

export default class OrganizationUrlController {
    async list() {
        return await OrganizationUrl.findAll({
            include: [
              {
                model: Organization,
                as: 'organization',
                include: [
                  {
                    model: Status,
                    as: 'status'
                  }
                ]
              },
              {
                model: Status,
                as: 'status'
              }
            ]
          });
    }

    async one (id:number) {
        return await OrganizationUrl.findByPk(id)
    }

    async create (url: string, organization_id: number, rank: number, partner: string, key?: string) {
        const organizationUrl = await OrganizationUrl.create({url, organization_id, rank, partner, key , status_id: 1});
        return organizationUrl;
    }

    async update (id: number, url: string, organizationId: number, rank: number, partner: string, key?: string | undefined, status_id?: number) {
        const organizationUrl = await OrganizationUrl.findByPk(id);
        if(organizationUrl) {
            organizationUrl.url = url;
            organizationUrl.organization_id = organizationId;
            organizationUrl.rank = rank;
            organizationUrl.partner = partner;
            organizationUrl.key = key!;
            organizationUrl.status_id = status_id!;
        }
    }

    async delete (id:number) {
        const organizationUrl = await OrganizationUrl.findByPk(id);  
        if (organizationUrl) {
            organizationUrl.destroy()
        }
        return organizationUrl;
    }
}