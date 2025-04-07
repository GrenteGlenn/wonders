import User from '../../models/user';
import UserGroup from '../../models/user-group';
// import { Op } from '@sequelize/core';
import UserGroupLink from '../../models/user-group-link';

const userInformationGroupExclude: string[] = [
  'owner',
  'password',
  'country_id',
  'language_id',
  'UserGroupLink',
  'birth_date',
  'created_at',
  'updated_at'
];

type UserGroupLinkAttrs = {
  is_owner: boolean;
  is_accepted: boolean;
};

type UserWithLink = User & {
  UserGroupLink?: UserGroupLinkAttrs;
};

type GroupWithUsers = UserGroup & {
  users?: UserWithLink[];
};

export default class UserGroupController {
  async one(groupId: number) {
    return await UserGroup.findByPk(groupId, {
      attributes: {
        exclude: userInformationGroupExclude
      },
      include: [
        {
          model: User,
          as: 'users',
          attributes: {
            exclude: userInformationGroupExclude
          },
          through: {
            attributes: ['is_owner', 'is_accepted']
          },
          required: false
        }
      ]
    });
  }

  async create(name: string, user_id: number) {
    const group = await UserGroup.create({ name: name, created_at: new Date(), updated_at: new Date() });
    if (group) {
      await UserGroupLink.create({
        user_group_id: group.id,
        user_id: user_id,
        is_accepted: true,
        is_owner: true,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  }

  async delete(groupId: number, userId: number) {
    const user = await User.findByPk(userId);

    const group = (await UserGroup.findByPk(groupId, {
      attributes: {
        exclude: userInformationGroupExclude
      },
      include: [
        {
          model: User,
          as: 'users',
          attributes: {
            exclude: userInformationGroupExclude
          },
          through: {
            attributes: ['is_owner', 'is_accepted']
          },
          required: false
        }
      ]
    })) as GroupWithUsers;
    const userIsOwner = group.users?.some((user: UserWithLink) => user.id === userId && user.UserGroupLink?.is_owner);

    // todo user.role === ROLE_ADMIN
    if (group && userIsOwner) {
      await group.destroy();

      return await group.destroy();
    }
  }

  //   async getAllByUser(userId: number) {
  //     return await UserGroup.findAll({
  //       attributes: {
  //         exclude: userInformationGroupExclude
  //       },
  //       include: [
  //         {
  //           model: User,
  //           as: 'users',
  //           attributes: {
  //             exclude: userInformationGroupExclude
  //           },
  //           required: false
  //         },
  //         {
  //           model: User,
  //           as: 'ownerUser',
  //           attributes: {
  //             exclude: userInformationGroupExclude
  //           }
  //         }
  //       ]
  //     });
  //   }

  async addUserToGroup(userId: number, groupId: number) {
    const existingGroupOwned = await UserGroup.findAll({});

    const existingGroupeAlereadyJoined = await UserGroupLink.findAll({
      where: {
        user_id: userId,
        user_group_id: groupId
      }
    });

    if (!existingGroupOwned && !existingGroupeAlereadyJoined) {
      await UserGroupLink.create({
        user_id: userId,
        user_group_id: groupId,
        is_owner: false,
        is_accepted: false,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  }

  async removeUserFromGroup(userId: number, groupId: number) {
    const group = await UserGroupLink.findOne({
      where: {
        user_id: userId,
        user_group_id: groupId
      }
    });
    if (group) {
      return await group.destroy();
    }
  }
}
