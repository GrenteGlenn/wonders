import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';

import CountryInterface from '../src/interfaces/CountryInterface';
import { Resolver } from 'dns';

interface CountryCreationAttributes extends Optional<CountryInterface, 'id'> { }

class Country extends Model<CountryInterface, CountryCreationAttributes> implements CountryInterface {
  public id!: number;
  public name!: string;
  public code!: string;
  public readonly createdAt?: Date | undefined;
  public readonly updatedAt?: Date | undefined;
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
  underscored: false,
  modelName: 'Country',
  timestamps: true,
});

export default Country;




// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Country extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Country.init({
//     name: DataTypes.STRING,
//     code: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Country',
//   });
//   return Country;
// };