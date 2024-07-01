import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import QuizInterface from '../interfaces/QuizInterface';

interface QuizCreationAttributes extends Optional<QuizInterface, 'id'> { }

class Quiz extends Model<QuizInterface, QuizCreationAttributes> implements QuizInterface {
  declare id: number;
  declare name: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Quiz.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize: connection,
  underscored: false,
  modelName: 'Quiz',
  timestamps: true,
});

export default Quiz;