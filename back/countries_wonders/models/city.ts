import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';

import CityInterface from '../src/interfaces/CityInterface';
import Country from './country';

interface CityCreationAttributes extends Optional<CityInterface, 'id'> {}

class City extends Model<CityInterface, CityCreationAttributes> implements CityInterface {
  declare id: number;
  declare name: string;
  declare country: number;
  declare readonly created_at?: Date | undefined;
  declare readonly updated_at?: Date | undefined;
}

City.init(
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
    country: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: 'id'
      },
      get() {
        const value = this.getDataValue('country');
        return value ? value : null;
      },
      set(value: number) {
        this.setDataValue('country', value);
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
    modelName: 'city'
  }
);

export default City;
