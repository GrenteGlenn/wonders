import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import QuizResponseInterface from '../src/interfaces/QuizResponseInterface';
import Quiz from './quiz';

interface QuizResponseCreationAttributes extends Optional<QuizResponseInterface , 'id'> { }

export default class QuizResponse extends Model<QuizResponseInterface, QuizResponseCreationAttributes> implements QuizResponseInterface {
    declare id: number;
    declare user_id: number;
    declare quiz_id: number;
    declare readonly created_at?: Date;
    declare readonly updated_at?: Date;
}

QuizResponse.init({
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
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
    sequelize: connection,
    underscored: true,
    modelName: 'quizResponse',
    tableName: 'quiz_responses',
    timestamps: false
});

QuizResponse.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
  as: 'quiz'
});