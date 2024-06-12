'use strict';

import { Optional } from 'sequelize';
import AddressInterface from '../src/interfaces/AddressInterface';

const {
  Model
} = require('sequelize');
type AddressCreationAttributes = Optional<AddressInterface, 'id'>;

module.exports = (sequelize, DataTypes) => {
  class Address extends Model<AddressCreationAttributes, AddressInterface> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.hasOne(models.User, {
        foreignKey: 'addressId',
        as: 'user'
      });
      // define association here
    }
  }
  Address.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:false,
      validate: {
        len: [2, 50]
      }
    },
    street: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:false,
      validate: {
        len: [2, 255]
      }
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:false,
      validate: {
        len: [2, 50]
      }
    },
    zipCode: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:false,
      validate: {
        len: [2, 50]
      }
    },
    complemntary: {
      type:DataTypes.TEXT,
      allowNull:true,
      unique:false
    },
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};