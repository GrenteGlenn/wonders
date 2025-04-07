import { DataTypes, Model, Optional } from 'sequelize';
import { UserGroupLinkInterface } from '../src/interfaces/UserGroup';
import sequelize from '../config/dbConnection';
import User from './user';
import UserGroup from './user-group';


export default class UserGroupLink extends Model<UserGroupLinkInterface> implements UserGroupLinkInterface {
  declare user_id: number;
  declare user_group_id: number;
  declare is_accepted: boolean;
  declare is_owner: boolean;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

UserGroupLink.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: User,
        key: 'id'
      }
    },
    user_group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: UserGroup,
        key: 'id'
      }
    },
    is_accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_owner: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
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

