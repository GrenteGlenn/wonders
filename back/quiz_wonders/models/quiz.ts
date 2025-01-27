import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';

import QuizLine from './quizline';
import Tag from './tag';
import QuizInterface from '../src/interfaces/QuizInterface';

interface QuizCreationAttributes extends Optional<QuizInterface, 'id'> {
}

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

Quiz.init({
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
}, {
  sequelize: connection,
  underscored: true,
  modelName: 'Quiz',
  tableName: 'quizzes',
  timestamps: false
});

QuizLine.belongsTo(Quiz, {
  foreignKey: 'quiz_id',
  as: 'quiz'
});

Quiz.hasMany(QuizLine, {
  foreignKey: 'quiz_id',
  as: 'quiz_lines'
});

Quiz.belongsTo(Tag, {
  foreignKey: 'tag_id',
  as: 'tags'
});

export default Quiz;
