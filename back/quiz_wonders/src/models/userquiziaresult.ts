import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import UserQuizIAResultInterface from '../interfaces/UserQuizIaResultInterface';

interface UserQuizIAResultCreationAttributes extends Optional<UserQuizIAResultInterface, 'id'> { }

export default class UserQuizIAResult extends Model<UserQuizIAResultInterface, UserQuizIAResultCreationAttributes> implements UserQuizIAResultInterface {
  declare id: number;
  declare created_at: Date;
  declare updated_at?: Date;
  declare quiz_response: number;
  declare user_quiz_ia_result_сountry: number;
}

UserQuizIAResult.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  quiz_response: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'QuizResponses',
      key: 'id'
    }
  },
  user_quiz_ia_result_сountry: {
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
