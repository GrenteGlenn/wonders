import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import { SubjectInterface } from '../src/interfaces/interfaces';
import Topic from './topic';

interface SubjectCreationAttributes extends Optional<SubjectInterface, 'id'> {}

export default class Subject extends Model<SubjectInterface, SubjectCreationAttributes> implements SubjectInterface {
  declare id: number;
  declare title: string;
  declare content: string;
  declare user_id: number;
  declare topic: number;
  declare created_at?: Date;
  declare updated_at?: Date;
}

Subject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    topic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Topic,
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Subject',
    timestamps: false
  }
);

Subject.belongsTo(Topic, {
  foreignKey: 'topic',
  as: 'topicDetails'
});

Topic.hasMany(Subject, {
  foreignKey: 'topic',
  as: 'subjects'
});
