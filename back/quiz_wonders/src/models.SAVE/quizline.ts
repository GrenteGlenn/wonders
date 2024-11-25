import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import QuizLineInterface from '../interfaces/QuizLineInterface';
import Quiz from './quiz';
import TagModel from './tag';
import ResponseKind from './responsekind';

interface QuizLineCreationAttributes extends Optional<QuizLineInterface, 'id'> {}

export default class QuizLine
  extends Model<QuizLineInterface, QuizLineCreationAttributes>
  implements QuizLineInterface
{
  declare id: number;
  declare question: string;
  declare is_boolean?: boolean;
  declare is_text?: boolean;
  declare quiz_id?: number;
  declare step?: number;
  declare is_required: boolean;
  declare mutiple_type_answer: boolean;
  declare response_kind_id: number;
  declare readonly created_at?: Date | undefined;
  declare readonly updated_at?: Date | undefined;

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.created_at;
    delete values.updated_at;
    delete values.quiz_id;
    delete values.response_kind_id;
    return values;
  }
}

QuizLine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    is_boolean: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_text: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_required: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Quiz,
        key: 'id'
      }
    },
    mutiple_type_answer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    response_kind_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ResponseKind,
        key: 'id'
      }
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
  },
  {
    sequelize: connection,
    underscored: true,
    modelName: 'QuizLine',
    tableName: 'quiz_lines',
    timestamps: false
  }
);

TagModel.hasMany(QuizLine, {
  foreignKey: 'quiz_id',
  as: 'quiz_lines'
});

QuizLine.belongsTo(ResponseKind, {
  foreignKey: 'response_kind_id',
  as: 'response_kind'
});
