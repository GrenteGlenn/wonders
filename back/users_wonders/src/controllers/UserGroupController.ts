import User from '../../models/user';
import UserGroup from '../../models/user-group';
// import { Op } from '@sequelize/core';
import UserGroupLink from '../../models/user-group-link';
import AuthController from './AuthController';
import UserRoles from '../enums/enums';

const authController = new AuthController();

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
    const user = await authController.getOne(userId);

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

    if (user?.dataValues.role?.role === UserRoles.UserRoles.Admin || (group && userIsOwner)) {
      await UserGroupLink.destroy({
        where: {
          user_group_id: groupId
        }
      });
      await group.destroy();
      return true;
    } else {
      return false;
    }
  }

  async getAllByUser(userId: number) {
    return await UserGroup.findAll({
      where: {
        '$users.id$': userId
      },
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
          required: true
        }
      ]
    });
  }

  async addUserToGroup(email: string, group_id: number) {
    const existingUser = await User.findOne({
      where: {
        email: email
      }
    });
    if (existingUser === null) {
      throw new Error('user not found');
    }
    const existingGroupOwned = await UserGroup.findAll({});

    const existingGroupeAlereadyJoined = await UserGroupLink.findAll({
      where: {
        user_id: existingUser.id,
        user_group_id: group_id
      }
    });

    if (!existingGroupOwned && !existingGroupeAlereadyJoined) {
      return await UserGroupLink.create({
        user_id: existingUser.id,
        user_group_id: group_id,
        is_owner: false,
        is_accepted: false,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  }

  async acceptToJoinToGroup(userId: number, groupId: number) {
    const existingGroupeAlereadyJoined = await UserGroupLink.findOne({
      where: {
        user_id: userId,
        user_group_id: groupId
      }
    });
    if (existingGroupeAlereadyJoined) {
      existingGroupeAlereadyJoined.is_accepted = true;
      await existingGroupeAlereadyJoined?.save();
    }
  }

  async removeUserFromGroup(userId: number, groupId: number) {
    const groupLink = await UserGroupLink.findOne({
      where: {
        user_id: userId,
        user_group_id: groupId
      }
    });

    if (!groupLink) return;

    const allLinks = await UserGroupLink.findAll({
      where: { user_group_id: groupId }
    });

    const isOwner = groupLink.is_owner;
    const otherMembers = allLinks.filter((link) => link.user_id !== userId);

    if (isOwner) {
      if (otherMembers.length > 0) {
        const newOwner = otherMembers[0];
        await newOwner.update({ is_owner: true });
      } else {
        await groupLink.destroy();
      }
    }

    return await groupLink.destroy();
  }

  async addUserQuizAnswerToUserGroup(quiz_answer_id: number, user_id: number, group_id: number) {
    const userGroupLinkResult = await UserGroupLink.findOne({
      where: {
        user_id: user_id,
        user_group_id: group_id
      }
    });
    if (userGroupLinkResult !== null) {
      await userGroupLinkResult.update({
        user_quiz_answer_id: quiz_answer_id
      });
    }
  }

  async removeUserQuizAnswerToUserGroup(user_id: number, group_id: number) {
    const userGroupLinkResult = await UserGroupLink.findOne({
      where: {
        user_id: user_id,
        user_group_id: group_id
      }
    });
    if (userGroupLinkResult !== null) {
      await userGroupLinkResult.update({
        user_quiz_answer_id: null
      });
    }
  }
}
