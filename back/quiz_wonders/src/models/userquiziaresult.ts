import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import UserQuizIAResultInterface from '../interfaces/UserQuizIaResultInterface';

interface UserQuizIAResultCreationAttributes extends Optional<UserQuizIAResultInterface, 'id'> { }

export default class UserQuizIAResult extends Model<UserQuizIAResultInterface, UserQuizIAResultCreationAttributes> implements UserQuizIAResultInterface {
  declare id: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare quizResponseId: number;
  declare userQuizIaResultCountryId: number;
}

UserQuizIAResult.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  quizResponseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'QuizResponses',
      key: 'id'
    }
  },
  userQuizIaResultCountryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'UserQuizIaResultCountries',
      key: 'id'
    }
  }
}, {
  sequelize: connection,
  modelName: 'UserQuizIAResult'
});
