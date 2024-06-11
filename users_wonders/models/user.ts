'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.belongsToMany(models.Role, {
        through: 'UserRole',
        as: 'roles',
        foreignKey: 'userId',
        otherKey: 'roleId'
      })
    }
  }
  User.init({
    surname: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        len: [2, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [8, 50],
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: true
    },
    birthDate: {
      type: DataTypes.DATE,
      unique: false,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};