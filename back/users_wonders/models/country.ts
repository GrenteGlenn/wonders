'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import CountryInterface from '../src/interfaces/CountryInterface';
import sequelize from '../config/dbConnection';

interface CountryCreationAttributes extends Optional<CountryInterface, 'id'> {
}

class Country extends Model<CountryInterface, CountryCreationAttributes>
  implements CountryInterface {
  declare id: number;
  declare name: string;
  declare code: string;
}

Country.init(
  {
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
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Country',
    timestamps: false // Enables createdAt and updatedAt automatically
  }
);

export default Country;
