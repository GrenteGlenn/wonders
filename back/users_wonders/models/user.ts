'use strict';

import { DataTypes, Model, Optional } from 'sequelize';
import UserInterface from '../src/interfaces/UserInterface';
import LanguageInterface from '../src/interfaces/LanguageInterface';
import sequelize from '../config/dbConnection';
import Language from './language';

interface UserCreationAttributes extends Optional<UserInterface, 'id'> {
}

class User extends Model<UserInterface, UserCreationAttributes> implements UserInterface {
  declare id: number;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare password: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
  declare birth_date: Date;
  declare language_id: LanguageInterface;
}

User.init(
  {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    birth_date: DataTypes.DATE,
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Language,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'User',
    timestamps: true // Enables createdAt and updatedAt automatically
  }
);

User.hasOne(Language, {
  foreignKey: 'language_id'
});

Language.belongsTo(User);

export default User;
