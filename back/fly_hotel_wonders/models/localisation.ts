import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import connection from '../config/dbConnection';
import LocalisationInterface from '../src/interface/localisation'

interface LocalisationCreationAttributes extends Optional<LocalisationInterface, 'id'> { }

export default class Localisation extends Model<LocalisationInterface, LocalisationCreationAttributes> implements LocalisationInterface {
  declare id?: number;
  declare lat: string;
  declare lng: string;
  declare country_id: number;
  declare city_id: number;
  declare city_name: string;
  declare created_at: Date;
  declare updated_at: Date;
}
Localisation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  lng: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country_id: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  city_id: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  city_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('NOW()')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('NOW()')
  }
},
  {
    sequelize: connection,
    underscored: true,
    modelName: 'Localisation',
    timestamps: false
  }
);