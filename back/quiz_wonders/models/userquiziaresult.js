'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserQuizIAResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuizLine.hasOne(models.UserAnswer, {
        foreignKey: 'userAsnswerId',
        as: 'useranswer'
      })
    }
  }
  UserQuizIAResult.init({
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserQuizIAResult',
  });
  return UserQuizIAResult;
};