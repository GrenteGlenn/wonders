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
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    country: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
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
