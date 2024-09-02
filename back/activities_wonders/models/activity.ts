import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnexion'

import ActivityInterface from '../src/interfaces/activity'
import ActivityCategory from './activityCategory';

interface ActivityCreationAttributes extends Optional<Activity, 'id'> {
}

class Activity extends Model<ActivityInterface, ActivityCreationAttributes> implements ActivityInterface {
    declare id: number;
    declare name: string;
    declare url: string;
    declare description: Text;
    declare isFree: boolean;
    declare category_id: number;
    declare readonly created_at?: Date;
    declare readonly updated_at?: Date;
}

Activity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  isFree: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  category_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize: connection,
  underscored: true,
  timestamps: true,
  modelName: 'activity'
});

Activity.belongsTo(ActivityCategory, {
  foreignKey: 'category_id',
  as: 'category'
})

export default Activity;