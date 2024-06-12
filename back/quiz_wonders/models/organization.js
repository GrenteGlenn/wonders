'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Organization.hasOne(models.Status, {
        foreignKey: 'statusId'
        as: 'status'
      }),
      Organization.hasOne(models.UserAnswer, {
        foreignKey: 'userAnswerId'
        as: 'userAnswer'
      })
    }
  }
  Organization.init({
    createdAt:{
      type: DataTypes.DATE
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};