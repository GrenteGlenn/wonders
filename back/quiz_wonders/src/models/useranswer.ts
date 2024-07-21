import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import UserAnswerInterface from '../interfaces/UserAnswerInterface';
import QuizLine from './quizline';

interface UserAnswerCreationAttributes extends Optional<UserAnswerInterface, 'id'> {}

export default class UserAnswer extends Model<UserAnswerInterface, UserAnswerCreationAttributes> implements UserAnswerInterface {
  declare id: number;
  declare date: Date;
  declare user_id: number;
  declare quiz_line: number;
  declare readonly created_at: Date;
  declare readonly updated_at?: Date;
}

UserAnswer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quiz_line: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: QuizLine,
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  sequelize: connection,
  modelName: 'UserAnswer',
  tableName: 'user_answers',
  timestamps: false,
  underscored: true
});

UserAnswer.belongsTo(QuizLine, {
  foreignKey: 'quizLineId',
  as: 'quizLine'
});

QuizLine.hasMany(UserAnswer, {
  foreignKey: 'quizLineId',
  as: 'userAnswers'
});
