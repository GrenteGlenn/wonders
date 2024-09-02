import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnexion'

import PictureInterface from '../src/interfaces/picture'
import ActivityCategory from './activityCategory';

interface PictureCreationAttributes extends Optional<Picture, 'id'> {
}

class Picture extends Model<PictureInterface, PictureCreationAttributes> implements PictureInterface {
  declare id: number;
  declare path: string;
  declare readonly created_at?: Date;
  declare readonly updated_at?: Date;
}

Picture.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize: connection,
  underscored: true,
  timestamps: true,
  modelName: 'picture'
});

Picture.hasMany(ActivityCategory, {
  foreignKey: 'picture_id',
  as: 'picture'
})

export default Picture;