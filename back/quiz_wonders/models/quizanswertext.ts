import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
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
  declare readonly created_at?: Date | undefined;
  declare updated_at?: Date | undefined;

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
    sequelize,
    underscored: true,
    modelName: 'QuizAnswerText',
    timestamps: false
  }
);

QuizLine.hasMany(QuizAnswerText, { foreignKey: 'quiz_line_id' });
QuizAnswerText.belongsTo(QuizLine, { foreignKey: 'quiz_line_id' });
