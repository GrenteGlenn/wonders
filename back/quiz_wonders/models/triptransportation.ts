import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import TripTransportationInterface from '../src/interfaces/TripTransportationInterface';
import Trip from './trip';

interface TripTransportationCreationAttributes extends Optional<TripTransportationInterface, 'id'> { }

class TripTransportation extends Model<TripTransportationInterface, TripTransportationCreationAttributes> implements TripTransportationInterface {
  declare id: number;
  declare from_date: Date;
  declare to_date: Date;
  declare price: number;
  declare url: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  }
}

TripTransportation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  from_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  to_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
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
  tableName: 'trip_transportations',
  modelName: 'TripTransportation',
  timestamps: false,
  underscored: true,
});

export default TripTransportation;
