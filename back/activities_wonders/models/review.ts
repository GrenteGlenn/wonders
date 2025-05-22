import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnexion';

import ReviewInterface from '../src/interfaces/review';
import Activity from './activity';
import Rating from './rating';

interface ReviewCreationAttributes extends Optional<ReviewInterface, 'id'> {}

export default class Review extends Model<ReviewInterface, ReviewCreationAttributes> implements ReviewInterface {
  declare id: number;
  declare comment: Text;
  declare rating_id: number;
  declare user_id: number;
  declare activity_id: number;
  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating_id: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.NUMBER,
      allowNull: true
    },
    activity_id: {
      type: DataTypes.NUMBER,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    underscored: true,
    timestamps: true,
    modelName: 'reviews'
  }
);

Review.belongsTo(Activity, {
  foreignKey: 'activity_id',
  as: 'activity'
});
Activity.hasMany(Review, {
  foreignKey: 'activity_id',
  as: 'reviews'
});

Review.belongsTo(Rating, {
  foreignKey: 'rating_id',
  as: 'ratings'
});
Rating.hasMany(Review, {
  foreignKey: 'rating_id',
  as: 'reviews'
});
