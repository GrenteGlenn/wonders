'use strict';

import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import UserInterface from '../src/interfaces/UserInterface';
import LanguageInterface from '../src/interfaces/LanguageInterface';
import sequelize from '../config/dbConnection';
import Language from './language';
import Role from './role';

interface UserCreationAttributes extends Optional<UserInterface, 'id'> {}

class User extends Model<UserInterface, UserCreationAttributes> implements UserInterface {
  declare id: number;

  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare password: string;
  declare birth_date: Date;
  declare language_id: LanguageInterface;
  declare country_id: number;
  declare role_id: number;
  declare updated_at: Date;
  declare readonly created_at: Date;
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
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()')
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'User',
    timestamps: false
  }
);

User.hasOne(Language, {
  foreignKey: 'language_id'
});

Language.belongsTo(User);

User.hasOne(Role, {
  sourceKey: 'id',
  foreignKey: 'role_id'
});

Role.belongsTo(User);


export default User;
