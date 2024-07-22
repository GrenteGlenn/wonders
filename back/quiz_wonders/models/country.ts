import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';

import CountryInterface from '../src/interfaces/CountryInterface';

interface CountryCreationAttributes extends Optional<CountryInterface, 'id'> {
}

class Country extends Model<CountryInterface, CountryCreationAttributes> implements CountryInterface {
  declare id: number;
  declare name: string;
  declare code: string;
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
  }
}, {
  sequelize: connection,
  underscored: true,
  timestamps: false,
  modelName: 'country'
});

export default Country;