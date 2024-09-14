import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import UserAnswerInterface from '../src/interfaces/UserAnswerInterface';
import QuizLine from './quizline';
import QuizResponse from './quizresponse';

interface UserAnswerCreationAttributes extends Optional<UserAnswerInterface, 'id'> {}

export default class UserAnswer extends Model<UserAnswerInterface, UserAnswerCreationAttributes> implements UserAnswerInterface {
  declare id: number;
  declare date: Date;
  declare quiz_response_id: number;
  declare quiz_line_id: number;
  declare quiz_answer_text_id: number;
  declare text: string;
  declare boolean: boolean;
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
  quiz_line_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: QuizLine,
      key: 'id'
    }
  },
  quiz_response_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: QuizResponse,
      key: 'id'
    }
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  boolean: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  quiz_answer_text_id: {
    type: DataTypes.INTEGER,
    allowNull: true
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
  foreignKey: 'quiz_line_id',
  as: 'quiz_line'
});

QuizLine.hasMany(UserAnswer, {
  foreignKey: 'quiz_line_id',
  as: 'user_answers'
});
