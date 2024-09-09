import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnexion'

import ActivityInterface from '../src/interfaces/activity'
import ActivityCategory from './activityCategory';
import Review from './review';

interface ActivityCreationAttributes extends Optional<Activity, 'id'> {
}

class Activity extends Model<ActivityInterface, ActivityCreationAttributes> implements ActivityInterface {
    declare id: number;
    declare name: string;
    declare url: string;
    declare description: Text;
    declare is_free: boolean;
    declare duration: number;
    declare price: number;
    declare partner: string
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
  is_free: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: true
  },
  duration: {
    type: DataTypes.NUMBER,
    allowNull: false,
    unique: true
  },
  partner: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: true,
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