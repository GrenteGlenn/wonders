import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import StatusInterface from '../src/interfaces/StatusInterface';
import { getHeapStatistics } from 'v8';

interface StatusCreationAttributes extends Optional<StatusInterface, 'id'> { }

class Status extends Model<StatusInterface, StatusCreationAttributes> implements StatusInterface {
  public id!: number;
  public name!: string;
  public readonly createdAt?: Date | undefined;
  public readonly updatedAt?: Date | undefined;
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
  }
}, {
  sequelize: connection,
  underscored: false,
  modelName: 'Status',
  timestamps: true,
});

export default Status;