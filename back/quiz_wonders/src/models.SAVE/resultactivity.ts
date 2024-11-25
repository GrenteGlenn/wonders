import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import ResultActivityInterface from '../interfaces/ResultActivityInterface';

interface ResultActivityCreationAttributes extends Optional<ResultActivityInterface, 'id'> {}

class ResultActivity
  extends Model<ResultActivityInterface, ResultActivityCreationAttributes>
  implements ResultActivityInterface
{
  declare step: number;
  declare id: number;
  declare activity_id: number;
  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;
}

ResultActivity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    activity_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize: connection,
    underscored: false,
    modelName: 'ResultActivity',
    timestamps: true
  }
);
