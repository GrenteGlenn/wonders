import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import City from './city'

import AirportInterface from '../src/interfaces/AirportInterface';

interface AirportCreationAttributes extends Optional<AirportInterface, 'id'> { }

class Airport extends Model<AirportInterface, AirportCreationAttributes> implements AirportInterface {
  declare id: number;
  declare name: string;
  declare code: string;
  declare city: number;
  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;
}

Airport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      get() {
        const value = this.getDataValue('id');
        return value ? value : null;
      },
      set(value: number) {
        this.setDataValue('id', value);
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        const value = this.getDataValue('name');
        return value ? value : null;
      },
      set(value: string) {
        this.setDataValue('name', value);
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        const value = this.getDataValue('code');
        return value ? value : null;
      },
      set(value: string) {
        this.setDataValue('code', value);
      }
    },
    city: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: City,
        key: 'id'
      },
      get() {
        const value = this.getDataValue('city');
        return value ? value : null;
      },
      set(value: number) {
        this.setDataValue('city', value);
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const value = this.getDataValue('created_at');
        return value ? value : null;
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const value = this.getDataValue('updated_at');
        return value ? value : null;
      }
    }
  },
  {
    sequelize: connection,
    underscored: true,
    timestamps: false,
    modelName: 'airport'
  }
);


City.hasMany(Airport, {
  foreignKey: 'city',
  as: 'airports'
});

Airport.belongsTo(City, {
  foreignKey: 'city',
  as: 'cityData'
});
export default Airport;
