import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import TripTransportationInterface from '../src/interfaces/TripTransportationInterface';

interface TripTransportationCreationAttributes extends Optional<TripTransportationInterface, 'id'> { }

class TripTransportation extends Model<TripTransportationInterface, TripTransportationCreationAttributes> implements TripTransportationInterface {
  declare id: number;
  declare from: Date;
  declare to: Date;
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
  from: {
    type: DataTypes.DATE,
    allowNull: false
  },
  to: {
    type: DataTypes.DATE,
    allowNull: false
  },
  price: {
    type: DataTypes.NUMBER,
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
  underscored: true,
  modelName: 'TripTransportation',
  tableName: 'trip_transportations',
  timestamps: false,
});

export default TripTransportation;
