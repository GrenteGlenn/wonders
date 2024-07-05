import OrganizationUrl from "../models/organizationurl";

export default class OrganizationUrlController {
    async list() {
        return await OrganizationUrl.findAll();
    }

    async one (id:number) {
        return await OrganizationUrl.findByPk(id)
    }

    async create (url: string, organizationId: number, rank: number, partner: string, key?: string) {
        const organizationUrl = await OrganizationUrl.create({url, organizationId, rank, partner, key });
        return organizationUrl;
    }

    async update (id: number, url: string, organizationId: number, rank: number, partner: string, key?: string | undefined) {
        const organizationUrl = await OrganizationUrl.findByPk(id);
        if(organizationUrl) {
            organizationUrl.url = url;
            organizationUrl.organizationId = organizationId;
            organizationUrl.rank = rank;
            organizationUrl.partner = partner;
            organizationUrl.key = key!;
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