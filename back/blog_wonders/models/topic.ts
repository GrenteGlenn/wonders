import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import { TopicInterface } from '../src/interfaces/interfaces'

interface TopicCreationAttributes extends Optional<TopicInterface, 'id'> {}

export default class Topic extends Model<TopicInterface, TopicCreationAttributes> implements TopicInterface {
  declare id: number;
  declare name: string;
  declare country_id: number;
  declare created_at: Date;
  declare updated_at: Date;
}

  Topic.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, 
    {
      sequelize,
      underscored: true,
      modelName: 'Topic',
      timestamps: false
    }
  );
  