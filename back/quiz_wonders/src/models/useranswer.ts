import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import UserAnswerInterface from '../interfaces/UserAnswerInterface';
import QuizLine from './quizline';
import QuizResponse from './quizresponse';
import QuizAnswerText from './quizanswertext';

interface UserAnswerCreationAttributes extends Optional<UserAnswerInterface, 'id'> {}

export default class UserAnswer
  extends Model<UserAnswerInterface, UserAnswerCreationAttributes>
  implements UserAnswerInterface
{
  declare id: number;
  declare date: Date;
  declare quiz_response_id: number | undefined;
  declare quiz_line_id: number | undefined;
  declare quiz_answer_text_id: number | undefined;
  declare text: string | undefined;
  declare boolean: boolean | undefined;
  declare readonly created_at: Date;
  declare readonly updated_at?: Date;

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.quiz_answer_text_id;
    delete values.quiz_line_id;
    delete values.created_at;
    delete values.quiz_response_id;
    return values;
  }
}

UserAnswer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    quiz_line_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: QuizLine,
        key: 'id'
      }
    },
    quiz_response_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: QuizResponse,
        key: 'id'
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    boolean: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    quiz_answer_text_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize: connection,
    modelName: 'UserAnswer',
    tableName: 'user_answers',
    timestamps: false,
    underscored: true
  }
);

UserAnswer.belongsTo(QuizLine, {
  foreignKey: 'quiz_line_id',
  as: 'quiz_line'
});

QuizLine.hasMany(UserAnswer, {
  foreignKey: 'quiz_line_id',
  as: 'user_answers'
});

UserAnswer.belongsTo(QuizAnswerText, {
  foreignKey: 'quiz_answer_text_id',
  as: 'quiz_answer_texts'
});

QuizAnswerText.hasMany(UserAnswer, {
  foreignKey: 'quiz_response_id',
  as: 'user_answers'
});
