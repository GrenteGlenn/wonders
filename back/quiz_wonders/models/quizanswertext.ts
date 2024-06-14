import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import QuizAnswerTextInterface from '../src/interfaces/QuizAnswerTextInterface';

interface QuizAnswerTextCreationAttributes extends Optional<QuizAnswerTextInterface, 'id'> { }

class QuizAnswerText extends Model<QuizAnswerTextInterface, QuizAnswerTextCreationAttributes> implements QuizAnswerTextInterface {
  public id!: number;
  public answer!: Text | null;
  public readonly createdAt?: Date | undefined;
  public readonly updatedAt?: Date | undefined;
}


QuizAnswerText.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize: connection,
  underscored: false,
  modelName: 'QuizAnswerText',
  timestamps: true,
});