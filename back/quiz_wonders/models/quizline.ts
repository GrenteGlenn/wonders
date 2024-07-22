import { DataTypes, Optional, Model } from 'sequelize';
import connection from '../config/dbConnection';
import QuizLineInterface from '../src/interfaces/QuizLineInterface';
import Quiz from './quiz';
import TagModel from './tag';
import ResponseKind from './responsekind';
import Tag from '../src/interfaces/TagInterface';

interface QuizLineCreationAttributes extends Optional<QuizLineInterface, 'id'> { }

export default class QuizLine extends Model<QuizLineInterface, QuizLineCreationAttributes> implements QuizLineInterface {
  declare id: number;
  declare question: Text;
  declare is_boolean?: boolean;
  declare is_text?: boolean;
  declare quiz_id: number;
  declare is_required: boolean;
  declare tag_id: number;
  declare response_kind_id: number;
  declare readonly created_at?: Date | undefined;
  declare readonly updated_at?: Date | undefined;

  // static associate() {
  //   this.belongsTo(Quiz, {
  //     foreignKey: 'quiz_id',
  //     as: 'quiz'
  //   });
  //   this.belongsTo(TagModel, {
  //     foreignKey: 'tag_id',
  //     as: 'tag'
  //   });
  //   this.belongsTo(ResponseKind, {
  //     foreignKey: 'response_kind_id',
  //     as: 'response_kind'
  //   });
  // }
}

QuizLine.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  is_boolean: {
    type: DataTypes.BOOLEAN,
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
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TagModel,
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
}, {
  sequelize: connection,
  underscored: true,
  modelName: 'QuizLine',
  tableName: 'quiz_lines',
  timestamps: false,
});


// QuizLine.belongsTo(Quiz, {
//   foreignKey: 'quiz_id',
//   as: 'quiz',
// });

// Quiz.hasMany(QuizLine, {
//   foreignKey: 'quiz_id',
//   as: 'quiz_lines',
// });

QuizLine.belongsTo(TagModel, {
  foreignKey: 'tag_id',
  as: 'tag',
});

QuizLine.belongsTo(ResponseKind, {
  foreignKey: 'response_kind_id',
  as: 'response_kind',
});