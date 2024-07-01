import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import UserAnswerInterface from '../interfaces/UserAnswerInterface';
import QuizLine from './quizline';

interface UserAnswerCreationAttributes extends Optional<UserAnswerInterface, 'id'> { }

class UserAnswer extends Model<UserAnswerInterface, UserAnswerCreationAttributes> implements UserAnswerInterface {
  declare id: number;
  declare date: Date;
  declare userId: number;
  declare quizLineId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt?: Date;
}

UserAnswer.hasOne(QuizLine, {
  foreignKey: {
    name: 'quizLineId',
    allowNull: false,
  }
});

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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  quizLineId: '',
}, {
  sequelize: connection,
  modelName: 'UserAnswer',
  timestamps: true,
});