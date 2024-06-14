import { DataTypes, Optional, Model } from "sequelize";
import connection from '../config/dbConnection';
import QuizLineInterface from "../src/interfaces/QuizLineInterface";
import Quiz from "./quiz";

interface QuizLineCreationAttributes extends Optional<QuizLineInterface, 'id'> { }

class QuizLine extends Model<QuizLineInterface, QuizLineCreationAttributes> implements QuizLineInterface {
  public id!: number;
  public question!: string;
  public isBoolean!: boolean;
  public isText!: boolean;
  public quizId!: number;
  public readonly createdAt?: Date | undefined;
  public readonly updatedAt?: Date | undefined;
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
    type: DataTypes.STRING,
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
}, {
  sequelize: connection,
  underscored: false,
  modelName: 'QuizLine',
  timestamps: true,
});