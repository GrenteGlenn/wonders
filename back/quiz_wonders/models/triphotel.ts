import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import TripHotelInterface from '../src/interfaces/TripHotelInterface';
import TripCity from './tripcity';

interface TripHotelCreationAttributes extends Optional<TripHotelInterface, 'id'> { }

class TripHotel extends Model<TripHotelInterface, TripHotelCreationAttributes> implements TripHotelInterface {
  declare id: number;
  declare trip_city_id: number;
  declare name: string;
  declare from: Date;
  declare price: number;
  declare to: Date;
  declare url: string;
  declare readonly created_at: Date;
  declare updated_at: Date;

  toJSON() {
    const values = Object.assign({}, this.get());
    return values;
  }
}

TripHotel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  trip_city_id: {
    type: DataTypes.DATE,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  from: {
    type: DataTypes.DATE,
    allowNull: true
  },
  to: {
    type: DataTypes.DATE,
    allowNull: true
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
  modelName: 'TripHotel',
  tableName: 'trip_hotels',
  timestamps: false,
});

TripHotel.belongsTo(TripCity, {
  foreignKey: 'trip_city_id',
  as: 'trip_city',
});

TripCity.hasMany(TripHotel, {
  foreignKey: 'trip_city_id',
  as: 'trip_city',
});

export default TripHotel;
