import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import QuizAnswerTextInterface from '../src/interfaces/QuizAnswerTextInterface';
import QuizLine from './quizline';

interface QuizAnswerTextCreationAttributes extends Optional<QuizAnswerTextInterface, 'id'> {}

export default class QuizAnswerText
  extends Model<QuizAnswerTextInterface, QuizAnswerTextCreationAttributes>
  implements QuizAnswerTextInterface
{
  declare id: number;
  declare answer: string;
  declare quiz_line_id: number;
  declare readonly createdAt?: Date | undefined;
  declare readonly updatedAt?: Date | undefined;

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.created_at;
    delete values.updated_at;
    return values;
  }
}

QuizAnswerText.init(
  {
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
    quiz_line_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize: connection,
    underscored: true,
    modelName: 'QuizAnswerText',
    timestamps: false
  }
);

QuizLine.hasMany(QuizAnswerText, { as: 'quiz_answer_texts', foreignKey: 'quiz_line_id' });
QuizAnswerText.belongsTo(QuizLine, { as: 'quiz_line', foreignKey: 'quiz_line_id' });
