import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { UserGroupInterface } from '../src/interfaces/UserGroup';
import sequelize from '../config/dbConnection';
import User from './user';
import UserGroupLink from './user-group-link';

interface UserGroupCreationAttributes extends Optional<UserGroupInterface, 'id'> {}

class UserGroup extends Model<UserGroupInterface, UserGroupCreationAttributes> implements UserGroupInterface {
  declare id: number;
  declare name: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}
const date = Sequelize.literal('NOW()')

UserGroup.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 50]
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: date
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: date
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'UserGroup',
    tableName: 'user_groups',
    timestamps: false
  }
);

User.belongsToMany(UserGroup, {
  through: UserGroupLink,
  foreignKey: 'user_id',
  otherKey: 'user_group_id',
  as: 'userGroups'
});

UserGroup.belongsToMany(User, {
  through: UserGroupLink,
  foreignKey: 'user_group_id',
  otherKey: 'user_id',
  as: 'users'
});

export default UserGroup;
