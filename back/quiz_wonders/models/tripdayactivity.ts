import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import TripDayActivityInterface from '../src/interfaces/TripDayActivityInterface';
import TripDay from './tripday';

interface TripDayActivityCreationAttributes extends Optional<TripDayActivityInterface, 'id'> { }

class TripDayActivity extends Model<TripDayActivityInterface, TripDayActivityCreationAttributes> implements TripDayActivityInterface {
  declare id: number;
  declare trip_day_id: number;
  declare activity_id: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  }
}

TripDayActivity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  trip_day_id: {
    type: DataTypes.DATE,
    allowNull: false
  },
  activity_id: {
    type: DataTypes.NUMBER,
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
  modelName: 'TripDayActivity',
  tableName: 'trip_day_activities',
  timestamps: false,
});

TripDayActivity.hasOne(TripDay, {
  foreignKey: 'trip_day_id',
  as: 'trip_day',
});

TripDay.hasMany(TripDayActivity, {
  foreignKey: 'trip_day_id',
  as: 'trip_day',
});

export default TripDayActivity;
