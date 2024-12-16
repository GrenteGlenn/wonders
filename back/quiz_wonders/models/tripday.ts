import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import TripDayInterface from '../src/interfaces/TripDayInterface';
import TripCity from './tripcity';

interface TripCreationAttributes extends Optional<TripDayInterface, 'id'> { }

class TripDay extends Model<TripDayInterface, TripCreationAttributes> implements TripDayInterface {
  declare id: number;
  declare trip_city_id: number;
  declare date: Date;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  }
}

TripDay.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  trip_city_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TripCity,
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATE,
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
  modelName: 'TripDay',
  tableName: 'trip_days',
  timestamps: false,
});


TripCity.hasMany(TripDay, {
  foreignKey: 'trip_city_id',
  as: "tripCity"
});
TripDay.belongsTo(TripCity, {
  foreignKey: 'trip_city_id',
  as: "cityTrip"
});
export default TripDay;
