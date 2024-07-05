import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import OrganizationUrlInterface from '../interfaces/OrganizationUrlInterface';
import Organization from './organization';

interface OrganizationUrlCreationAttributes extends Optional<OrganizationUrlInterface, 'id'> {}

export default class OrganizationUrl extends Model<OrganizationUrlInterface, OrganizationUrlCreationAttributes> implements OrganizationUrlInterface {
  declare id: number;
  declare rank: number;
  declare partner: string;
  declare key: string | null;
  declare organizationId: number;
  declare url: string | null;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

// Define the model fields and attributes
OrganizationUrl.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  organizationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Organization,
      key: 'id'
    }
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  partner: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  key: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: connection,
  modelName: 'OrganizationUrl',
  timestamps: true,
});

// Define associations
OrganizationUrl.belongsTo(Organization, {
  foreignKey: 'organizationId',
  as: 'organization'
});
