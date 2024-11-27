'use strict';

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import OrganizationInterface from '../src/interfaces/OrganizationInterface';
import Status from './status';

interface OrganizationCreationAttributes extends Optional<OrganizationInterface, 'id'> {}

class Organization
  extends Model<OrganizationInterface, OrganizationCreationAttributes>
  implements OrganizationInterface
{
  public id!: number;
  public user_id!: number;
  public status_id!: number;
  // public userAnswerId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // static associate() {
  //   Organization.belongsTo(Status, {
  //     foreignKey: 'status_id',
  //   });
  // }
}

Organization.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Status,
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
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'organization',
    timestamps: false
  }
);

Organization.belongsTo(Status, {
  foreignKey: 'status_id'
});

export default Organization;
