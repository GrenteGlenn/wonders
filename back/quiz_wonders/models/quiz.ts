import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import QuizInterface from '../src/interfaces/QuizInterface';
import Tag from './tag';
import QuizLine from './quizline';

interface QuizCreationAttributes extends Optional<QuizInterface, 'id'> {}

class Quiz extends Model<QuizInterface, QuizCreationAttributes> implements QuizInterface {
  declare id: number;
  declare name: string;
  declare tag_id: number;
  declare readonly createdAt: Date;
  declare updated_at: Date;

  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.tag_id;
    delete values.created_at;
    delete values.updated_at;
    return values;
  }
}

Quiz.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tag,
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
    sequelize,
    underscored: true,
    modelName: 'Quiz',
    tableName: 'quizzes',
    timestamps: false
  }
);

Quiz.belongsTo(Tag, {
  foreignKey: 'tag_id'
});

QuizLine.belongsTo(Quiz, {
  foreignKey: 'quiz_id'
});

Quiz.hasMany(QuizLine, {
  foreignKey: 'quiz_id'
});

export default Quiz;
