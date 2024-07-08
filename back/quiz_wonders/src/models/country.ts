import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';

import CountryInterface from '../interfaces/CountryInterface';

interface CountryCreationAttributes extends Optional<CountryInterface, 'id'> { }

class Country extends Model<CountryInterface, CountryCreationAttributes> implements CountryInterface {
  declare id: number;
  declare name: string;
  declare code: string;
  declare readonly created_at?: Date | undefined;
  declare readonly updated_at?: Date | undefined;
}

Country.init({
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
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize: connection,
  underscored: true,
  timestamps: true,
  modelName: 'country',
});

export default Country;