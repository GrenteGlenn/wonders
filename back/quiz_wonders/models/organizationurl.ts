import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import OrganizationUrlInterface from '../src/interfaces/OrganizationUrlInterface';
import Organization from './organization' ;
import Status from './status';

interface OrganizationUrlCreationAttributes extends Optional<OrganizationUrlInterface, 'id'> {}

class OrganizationUrl extends Model<OrganizationUrlInterface, OrganizationUrlCreationAttributes> implements OrganizationUrlInterface {
  declare id: number;
  declare rank: number;
  declare partner: string;
  declare key: string | null;
  declare organization_id: number;
  declare url: string | null;
  declare status_id: number;
  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;

  static associate() {
    // this.belongsTo(Organization, {
    //   foreignKey: 'organization_id',
    //   as: 'organization'
    // });
    // this.belongsTo(Status, {
    //   foreignKey: 'status_id',
    // });
  }
}

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
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Organization,
      key: 'id'
    }
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Status,
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
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize: connection,
  underscored: true,
  modelName: 'organization_url',
  timestamps: false,
});
OrganizationUrl.belongsTo(Organization, {
  foreignKey: 'organization_id',
  as: 'organization'
});
OrganizationUrl.belongsTo(Status, {
  foreignKey: 'status_id',
});

Status.hasMany(OrganizationUrl, {
  foreignKey: 'status_id',
});

export default OrganizationUrl
