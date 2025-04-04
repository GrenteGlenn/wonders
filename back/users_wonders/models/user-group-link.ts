import { DataTypes, Model, Optional } from 'sequelize';
import { UserGroupLinkInterface } from '../src/interfaces/UserGroup';
import sequelize from '../config/dbConnection';
import User from './user';
import UserGroup from './user-group';


class UserGroupLink extends Model<UserGroupLinkInterface> implements UserGroupLinkInterface {
  declare user_id: number;
  declare user_group_id: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

UserGroupLink.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    user_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserGroup,
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'UserGroupLink',
    timestamps: false
  }
);

export default UserGroupLink;
