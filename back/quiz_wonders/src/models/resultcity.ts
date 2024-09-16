import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import ResultCityInterface from '../interfaces/ResultCityInterface';

interface ResultCityCreationAttributes extends Optional<ResultCityInterface, 'id'> {}

class ResultCity extends Model<ResultCityInterface, ResultCityCreationAttributes> implements ResultCityInterface {
  declare id: number;
  declare step: number;
  declare start_at: Date;
  declare end_at: Date;
  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;
}

ResultCity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_at: {
      type: DataTypes.DATE,
      allowNull: false
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
    sequelize: connection,
    underscored: false,
    modelName: 'ResultCity',
    timestamps: true
  }
);
