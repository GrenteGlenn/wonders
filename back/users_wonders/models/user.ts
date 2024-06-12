'use strict';

import { on } from "events";

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define the many-to-many association between User and Role
      User.belongsToMany(models.Role, {
        through: 'UserRole',
        as: 'roles',
        foreignKey: 'userId',
        otherKey: 'roleId',
        onDelete: 'CASCADE'
      });
      User.hasOne(models.Country, {
        through: 'UserCountry',
        as: 'country',
        foreignKey: 'userId',
        otherKey: 'countryId'
      })
    }
  }

  User.init({
    surname: DataTypes.STRING,
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    birthDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true, // Enables createdAt and updatedAt automatically
  });

  return User;
};
