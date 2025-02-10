import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import OrganizationInterface from '../interfaces/OrganizationInterface';
import Status from './status';

interface OrganizationCreationAttributes extends Optional<OrganizationInterface, 'id'> {}

class Organization
  extends Model<OrganizationInterface, OrganizationCreationAttributes>
  implements OrganizationInterface
{
  declare id: number;
  declare user_id: number;
  declare status_id: number;
  declare readonly created_at: Date;
  declare updated_at?: Date;
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
    sequelize: connection,
    underscored: true,
    modelName: 'organization',
    timestamps: false
  }
);

Organization.belongsTo(Status, {
  foreignKey: 'status_id'
});

export default Organization;
