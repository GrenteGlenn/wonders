import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnexion'

import ReviewInterface from '../src/interfaces/review'

interface RatingCreationAttributes extends Optional<Rating, 'id'> {
}

class Rating extends Model<ReviewInterface, RatingCreationAttributes> implements ReviewInterface {
  declare id: number;
  declare rating: number;
  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;

  id: number;
  name: string;
  description: Text;
  isFree: boolean;
  Price: number;
  duration: number;
  user_id: number;
  activity_id: number;
  rating_id: number;
  created_at?: Date;
  updated_at?: Date;
}
}

Rating.init({
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
}, {
  sequelize: connection,
  underscored: true,
  timestamps: true,
  modelName: 'rating'
});