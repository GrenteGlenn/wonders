import { DataTypes, Optional, Model } from 'sequelize';
import connection from '../config/dbConnection';
import QuizLineInterface from '../interfaces/QuizLineInterface';
import Quiz from './quiz';
import TagModel from './tag';
import Tag from '../interfaces/TagInterface';

interface QuizLineCreationAttributes extends Optional<QuizLineInterface, 'id'> { }

export default class QuizLine extends Model<QuizLineInterface, QuizLineCreationAttributes> implements QuizLineInterface {
  declare id: number;
  declare question: Text;
  declare isBoolean: boolean;
  declare isText: boolean;
  declare quizId: number;
  declare isRequired: boolean;
  declare tag: Tag;
  declare readonly createdAt?: Date | undefined;
  declare readonly updatedAt?: Date | undefined;
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
  isBoolean: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  isText: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  isRequired: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Quiz,
      key: 'id'
    }
  },
  tag: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TagModel,
      key: 'id'
    }
  },
}, {
  sequelize: connection,
  modelName: 'QuizLine',
  timestamps: true,
});


QuizLine.belongsTo(Quiz, {
  foreignKey: 'quizId',
  as: 'quiz'
});

QuizLine.belongsTo(TagModel, {
  foreignKey: 'tag',
  as: 'tagModel'
});