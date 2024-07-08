import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import QuizAnswerTextInterface from '../interfaces/QuizAnswerTextInterface';

interface QuizAnswerTextCreationAttributes extends Optional<QuizAnswerTextInterface, 'id'> { }

class QuizAnswerText extends Model<QuizAnswerTextInterface, QuizAnswerTextCreationAttributes> implements QuizAnswerTextInterface {
  declare id: number;
  declare answer: Text | null;
  declare readonly createdAt?: Date | undefined;
  declare readonly updatedAt?: Date | undefined;
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
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize: connection,
  underscored: false,
  modelName: 'QuizAnswerText',
  timestamps: true,
});