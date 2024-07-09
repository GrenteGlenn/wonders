'use strict';

import { DataTypes, Model, Optional } from 'sequelize';
import UserInterface from '../src/interfaces/UserInterface';
import CountryInterface from '../src/interfaces/CountryInterface';
import LanguageInterface from '../src/interfaces/LanguageInterface';
import RoleInterface from '../src/interfaces/RoleInterface';
import sequelize from '../config/dbConnection';
import Language from './language';
import Country from './country';
import Role from './role';

interface UserCreationAttributes extends Optional<UserInterface, 'id'> {}

class User
  extends Model<UserInterface, UserCreationAttributes>
  implements UserInterface
{
  declare id: number;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare password: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare birthDate: Date;
  declare countryId: CountryInterface;
  declare languageId: LanguageInterface;
  declare role: RoleInterface[];
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
        isEmail: true,
      },
    },
    password: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    languageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Language,
        key: 'id',
      },
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'User',
    timestamps: true, // Enables createdAt and updatedAt automatically
  },
);

User.belongsToMany(Role, { through: 'User_Role' });

User.hasOne(Language, {
  foreignKey: 'languageId',
});

Language.belongsTo(User);

User.hasOne(Country, {
  foreignKey: 'countryId',
});

Country.belongsTo(User);

export default User;
