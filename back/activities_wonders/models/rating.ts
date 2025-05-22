import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnexion';

import RatingInterface from '../src/interfaces/rating';

interface RatingCreationAttributes extends Optional<RatingInterface, 'id'> {}

class Rating extends Model<RatingInterface, RatingCreationAttributes> implements RatingInterface {
  declare id: number;
  declare rating: number;
  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;
}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize: connection,
    underscored: true,
    timestamps: true,
    modelName: 'rating'
  }
);

export default Rating;
