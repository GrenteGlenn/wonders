import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import StatusInterface from '../interfaces/StatusInterface';
import { getHeapStatistics } from 'v8';
import OrganizationUrl from './organizationurl';

interface StatusCreationAttributes extends Optional<StatusInterface, 'id'> { }

class Status extends Model<StatusInterface, StatusCreationAttributes> implements StatusInterface {
  public id!: number;
  public name!: string;
  public readonly created_at?: Date | undefined;
  public updated_at?: Date | undefined;
}

Status.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
  modelName: 'status',
  timestamps: false,
});

export default Status;