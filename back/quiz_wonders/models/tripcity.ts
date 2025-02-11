import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import TripCityInterface from '../src/interfaces/TripCityInterface';
import TripTransportation from './triptransportation';
import Trip from './trip';
import TripDay from './tripday';

interface TripCreationAttributes extends Optional<TripCityInterface, 'id'> { }

class TripCity extends Model<TripCityInterface, TripCreationAttributes> implements TripCityInterface {
  declare id: number;
  declare trip_id: number;
  declare transportation_id: number;
  declare city_id: number;
  declare readonly created_at: Date;
  declare updated_at: Date;

  toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  }
}


TripCity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  trip_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Trip,
      key: 'id'
    }
  },
  city_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  transportation_id: {
    type: DataTypes.INTEGER,
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
  modelName: 'TripCity',
  tableName: 'trip_cities',
  timestamps: false
});


Trip.hasMany(TripCity, { foreignKey: 'trip_id', as: 'cities' });
TripCity.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

TripTransportation.hasMany(TripCity, { foreignKey: 'transportation_id', as: 'cities' });
TripCity.belongsTo(TripTransportation, { foreignKey: 'transportation_id', as: 'transportation' });

export default TripCity;