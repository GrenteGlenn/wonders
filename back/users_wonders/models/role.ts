'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import RoleInterface from '../src/interfaces/RoleInterface';
import User from './user';

interface RoleCreationAttributes extends Optional<RoleInterface, 'id'> {
}

class Role extends Model<RoleInterface, RoleCreationAttributes>
  implements RoleInterface {
  declare id: number;
  declare role: string;
}

Role.init(
  {
    role: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Role',
    timestamps: false // Enables createdAt and updatedAt automatically
  }
);

export default Role;
