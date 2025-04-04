import { DataTypes, Model, Optional } from 'sequelize';
import { UserGroupInterface } from '../src/interfaces/UserGroup';
import sequelize from '../config/dbConnection';
import User from './user';

interface UserGroupCreationAttributes extends Optional<UserGroupInterface, 'id'> {}

class UserGroup extends Model<UserGroupInterface, UserGroupCreationAttributes> implements UserGroupInterface {
  declare id: number;
  declare name: string;
  declare owner: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

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
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
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
    modelName: 'UserGroup',
    timestamps: false
  }
);

export default UserGroup;
