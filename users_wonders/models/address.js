'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
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
    }
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