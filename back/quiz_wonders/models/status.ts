import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import StatusInterface from '../src/interfaces/StatusInterface';

interface StatusCreationAttributes extends Optional<StatusInterface, 'id'> {}

class Status extends Model<StatusInterface, StatusCreationAttributes> implements StatusInterface {
  public id!: number;
  public name!: string;
  public readonly created_at?: Date | undefined;
  public readonly updated_at?: Date | undefined;
}

Status.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Status',
    timestamps: false
  }
);

export default Status;
