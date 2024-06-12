'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuizLine.hasOne(models.Quiz, {
        foreignKey: 'quizId',
        as: 'quiz'
      })
    }
  }
  QuizLine.init({
    question: DataTypes.STRING,
    isBoolean: DataTypes.BOOLEAN,
    isText: DataTypes.BOOLEAN,
    quizId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuizLine',
  });
  return QuizLine;
};