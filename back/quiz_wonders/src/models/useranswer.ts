import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import UserAnswerInterface from '../interfaces/UserAnswerInterface';
import QuizLine from './quizline';

interface UserAnswerCreationAttributes extends Optional<UserAnswerInterface, 'id'> {}

export default class UserAnswer extends Model<UserAnswerInterface, UserAnswerCreationAttributes> implements UserAnswerInterface {
  declare id: number;
  declare date: Date;
  declare userId: number;
  declare quizLineId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt?: Date;
}

UserAnswer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quizLineId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: QuizLine,
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  sequelize: connection,
  modelName: 'UserAnswer',
  timestamps: true,
});

UserAnswer.belongsTo(QuizLine, {
  foreignKey: 'quizLineId',
  as: 'quizLine'
});

QuizLine.hasMany(UserAnswer, {
  foreignKey: 'quizLineId',
  as: 'userAnswers'
});
