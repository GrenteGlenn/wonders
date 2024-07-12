'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import LanguageInterface from '../src/interfaces/LanguageInterface';
import sequelize from '../config/dbConnection';

interface LanguageCreationAttributes
  extends Optional<LanguageInterface, 'id'> {
}

class Language extends Model<LanguageInterface, LanguageCreationAttributes>
  implements LanguageInterface {
  declare id: number;
  declare name: string;
}

Language.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Language',
    timestamps: false // Enables createdAt and updatedAt automatically
  }
);

export default Language;
