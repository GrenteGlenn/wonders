'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResultActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ResultActivity.init({
    activityId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'ResultActivity',
  });
  return ResultActivity;
};