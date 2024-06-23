import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import OrganizationUrlInterface from '../src/interfaces/OrganizationUrlInterface';
import Organization from './organization';

interface OrganizationUrlCreationAttributes extends Optional<OrganizationUrlInterface, 'id'> { }

class OrganizationUrl extends Model<OrganizationUrlInterface, OrganizationUrlCreationAttributes> implements OrganizationUrlInterface {
  public id!: number;
  public rank!: number;
  public partner!: string;
  public key!: string | null;
  public organisationId!: number;
  public url!: string;
  public organizationId!: Organization;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}
OrganizationUrl.hasOne(Organization, {
  foreignKey: {
    name: 'organizationId',
    allowNull: false,
  }
});

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
  organisationId: {
    type: DataTypes.INTEGER,
    allowNull: false
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
}, {
  sequelize: connection,
  modelName: 'OrganizationUrl',
  timestamps: true,
});
