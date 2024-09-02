import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnexion'

import ActivityCategoryInterface from '../src/interfaces/activityCategory';

interface ActivityCategoryCreationAttributes extends Optional<ActivityCategory, 'id'> {
}

class ActivityCategory extends Model<ActivityCategoryInterface, ActivityCategoryCreationAttributes> implements ActivityCategoryInterface {
    declare id: number;
    declare name: string;
    declare picture_id: number;
    declare readonly created_at?: Date;
    declare readonly updated_at?: Date;
}

ActivityCategory.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  picture_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize: connection,
  underscored: true,
  timestamps: true,
  modelName: 'activityCategory'
});

// ActivityCategory.belongsTo(Picture, {
//     foreignKey: 'picture_id',
//     as: 'picture'
//   })

export default ActivityCategory;