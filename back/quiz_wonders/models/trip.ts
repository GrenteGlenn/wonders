import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import TripInterface from '../src/interfaces/TripInterface';
import TripTransportation from './triptransportation';

interface TripCreationAttributes extends Optional<TripInterface, 'id'> { }

class Trip extends Model<TripInterface, TripCreationAttributes> implements TripInterface {
  declare id: number;
  declare from: Date;
  declare to: Date;
  declare user_id: number;
  declare transportation_id: number;
  declare country_id: number;
  declare duration: number;
  declare url: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  }
}

Trip.init({
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
  user_id: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  country_id: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  duration: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  transportation_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    references: {
      model: TripTransportation,
      key: 'id'
    }
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
  modelName: 'Trip',
  tableName: 'trips',
  timestamps: false,
});

Trip.hasOne(TripTransportation, {
  foreignKey: 'transportation_id',
  as: 'trip_transportation',
});

TripTransportation.hasMany(Trip, {
  foreignKey: 'transportation_id',
  as: 'trip_transportation',
});

export default Trip;
