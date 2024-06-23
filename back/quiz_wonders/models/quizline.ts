import { DataTypes, Optional, Model } from "sequelize";
import connection from '../config/dbConnection';
import QuizLineInterface from "../src/interfaces/QuizLineInterface";
import Quiz from "./quiz";
import Tag from "../src/interfaces/TagInterface";

interface QuizLineCreationAttributes extends Optional<QuizLineInterface, 'id'> { }

export default class QuizLine extends Model<QuizLineInterface, QuizLineCreationAttributes> implements QuizLineInterface {
  declare id: number;
  declare question: Text;
  declare isBoolean: boolean;
  declare isText: boolean;
  declare quizId: number;
  declare isRequired: boolean;
  declare tag : Tag;
  declare readonly createdAt?: Date | undefined;
  declare readonly updatedAt?: Date | undefined;
}
QuizLine.hasOne(Quiz, {
   foreignKey: {
    name:'quizId',
    allowNull: false,
   }
   });
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
      model: 'Quizzes',
      key: 'id'
    }
  },
  tag: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Tags',
      key: 'id'
    }
  },
}, {
  sequelize: connection,
  underscored: false,
  modelName: 'QuizLine',
  timestamps: true,
});