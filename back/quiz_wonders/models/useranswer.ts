import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import UserAnswerInterface from '../src/interfaces/UserAnswerInterface';
import QuizLine from './quizline';

interface UserAnswerCreationAttributes extends Optional<UserAnswerInterface, 'id'> { }

class UserAnswer extends Model<UserAnswerInterface, UserAnswerCreationAttributes> implements UserAnswerInterface {
  public id!: number;
  public date!: Date;
  public userId!: number;
  public quizLineId!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
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
}, {
  sequelize: connection,
  modelName: 'UserAnswer',
  timestamps: true,
});