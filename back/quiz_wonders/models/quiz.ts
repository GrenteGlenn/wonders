import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import QuizInterface from '../src/interfaces/QuizInterface';

interface QuizCreationAttributes extends Optional<QuizInterface, 'id'> { }

class Quiz extends Model<QuizInterface, QuizCreationAttributes> implements QuizInterface {
  public id!: number;
  public name!: string;
  public readonly createdAt?: Date | undefined;
  public readonly updatedAt?: Date | undefined;
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
  }
}, {
  sequelize: connection,
  underscored: false,
  modelName: 'Quiz',
  timestamps: true,
});

export default Quiz;