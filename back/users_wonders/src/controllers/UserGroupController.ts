import User from '../../models/user';
import UserGroup from '../../models/user-group'
import { Op } from '@sequelize/core';
import UserGroupLink from '../../models/user-group-link';

const userInformationGroupExclude: string[] = ['owner', 'password', 'country_id', 'language_id', 'UserGroupLink', 'birth_date', 'created_at', 'updated_at']

export default class UserGroupController {
    async one(groupId: number) {
        return await UserGroup.findByPk(groupId, {
            attributes: {
                exclude: userInformationGroupExclude
            },
            include: [{
                model: User,
                as: 'users',
                attributes: {
                    exclude: userInformationGroupExclude
                },
                required: false,
            },
            {
                model: User,
                as: 'ownerUser',
                attributes: {
                    exclude: userInformationGroupExclude
                },
            }],
        });
    }

    async create(name: string, user_id: number) {
        await UserGroup.create({ name: name, owner: user_id, created_at: new Date(), updated_at: new Date() })
    }

    async delete(groupId: number) {
        const group = await UserGroup.findByPk(groupId)
        if (group) {
            UserGroup.destroy()
        }
    }

    async getAllByUser(userId: number) {

        return await UserGroup.findAll({
            where: {
                [Op.or]: [
                    { owner: userId }
                ]
            } as any,
            attributes: {
                exclude: userInformationGroupExclude
            },
            include: [{
                model: User,
                as: 'users',
                attributes: {
                    exclude: userInformationGroupExclude
                },
                required: false,
            },
            {
                model: User,
                as: 'ownerUser',
                attributes: {
                    exclude: userInformationGroupExclude
                },
            }],
        });
    }

    async addUserToGroup(userId: number, groupId: number) {
        const existingGroupOwned = await UserGroup.findAll({
            where: {
                owner: userId
            }
        })

        const existingGroupeAlereadyJoined = await UserGroupLink.findAll({
            where: {
                user_id: userId,
                user_group_id: groupId
            }
        })

        if (!existingGroupOwned && !existingGroupeAlereadyJoined) {
            await UserGroupLink.create({ user_id: userId, user_group_id: groupId, created_at: new Date(), updated_at: new Date() })
        }
    }

    async removeUserFromGroup(userId: number, groupId: number) {
        const group = await UserGroupLink.findOne({
            where: {
                user_id: userId,
                user_group_id: groupId
            }
        })
        if (group) {
            await group.destroy()
        }
    }
}