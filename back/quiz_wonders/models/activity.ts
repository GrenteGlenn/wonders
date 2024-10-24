import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import ActivityInterface from '../src/interfaces/ActivityInterface';

interface ActivityCreationAttributes extends Optional<ActivityInterface, 'id'> {}

class Activity extends Model<ActivityInterface, ActivityCreationAttributes> implements ActivityInterface {
  declare id: number;
  declare name: string;
  declare latitude: number;
  declare longitude: number;
  declare place_id: string;
  declare address: string;
  declare price_level: number;
  declare rating: number;
  declare readonly updated_at?: Date | undefined;
  declare readonly created_at?: Date | undefined;
}

Activity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longitude: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    latitude: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    place_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    price_level: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    address: {
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
    sequelize: connection,
    underscored: true,
    timestamps: false,
    modelName: 'country'
  }
);

export default Activity;
