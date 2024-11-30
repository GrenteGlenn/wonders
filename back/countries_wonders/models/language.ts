import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../config/dbConnection';

import LanguageInterface from '../src/interfaces/LanguageInterface';
import Country from './country';

interface LanguageCreationAttributes extends Optional<LanguageInterface, 'id'> {}

class Language extends Model<LanguageInterface, LanguageCreationAttributes> implements LanguageInterface {
  declare id: number;
  declare name: string;
  declare code: string;
  declare created_at?: Date;
  declare updated_at?: Date;
}

Language.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      get() {
        const value = this.getDataValue('id');
        return value ? value : null;
      },
      set(value: number) {
        this.setDataValue('id', value);
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        const value = this.getDataValue('name');
        return value ? value : null;
      },
      set(value: string) {
        this.setDataValue('name', value);
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      get() {
        const value = this.getDataValue('code');
        return value ? value : null;
      },
      set(value: string) {
        this.setDataValue('code', value);
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const value = this.getDataValue('created_at');
        return value ? value : null;
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const value = this.getDataValue('updated_at');
        return value ? value : null;
      }
    }
  },
  {
    sequelize: connection,
    underscored: true,
    timestamps: false,
    modelName: 'language'
  }
);

export default Language;
