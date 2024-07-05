import Organization from "../models/organization";

export default class OrganizationController {
    async list() {
        return await Organization.findAll();
    }

    async one(id: number) {
        return await Organization.findByPk(id);
    }

    async new(userId: number, statusId: number, userAnswerId: number) {
        const organization = await Organization.create({ userId, statusId })
        return organization;

    }

    async update(id: number, userId: number, statusId: number, userAnswerId: number) {
        const organization = await Organization.findByPk(id)
        if (organization) {
            organization.userId = userId;
            organization.statusId = statusId;
            // organization.userAnswerId = userAnswerId;
            await organization.save()
        }
        return organization;
    }

    async delete(id: number) {

        const organization = await Organization.findByPk(id)
        if (organization) {
            await organization.destroy();
        }
        return organization;
    }
}