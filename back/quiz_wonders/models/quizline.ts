import { DataTypes, Optional, Model } from 'sequelize';
import connection from '../config/dbConnection';
import QuizLineInterface from '../src/interfaces/QuizLineInterface';
import Quiz from './quiz';
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
  declare parent?: boolean;
  declare response_kind_id: number;
  declare readonly created_at?: Date | undefined;
  declare updated_at?: Date | undefined;

  // toJSON() {
  //   const values = Object.assign({}, this.get());
  //   delete values.created_at;
  //   delete values.updated_at;
  //   delete values.quiz_id;
  //   return values;
  // }
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
    mutiple_type_answer: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: QuizLine,
        key: 'id'
      }
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

QuizLine.belongsTo(ResponseKind, {
  foreignKey: 'response_kind_id',
  as: 'response_kind'
});

QuizLine.hasMany(QuizLine, {
  as: 'childrens',
  foreignKey: 'parent'
});

QuizLine.belongsTo(QuizLine, {
  as: 'Parent',
  foreignKey: 'parent'
});
