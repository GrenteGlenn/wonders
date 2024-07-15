'use strict';

import { DataTypes, Model, Optional } from 'sequelize';
import AddressInterface from '../src/interfaces/AddressInterface';
import CountryInterface from '../src/interfaces/CountryInterface';
import UserInterface from '../src/interfaces/UserInterface';
import sequelize from '../config/dbConnection';
import Country from './country';
import User from './user';

interface AddressCreationAttributes extends Optional<CountryInterface, 'id'> {
}

class Address extends Model<AddressInterface, AddressCreationAttributes>
  implements AddressInterface {
  declare id: number;
  declare name: string;
  declare street: string;
  declare city: string;
  declare zip_code: string;
  declare complementary: string;
  declare country_id: CountryInterface;
  declare userId: UserInterface;
}

Address.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [2, 50]
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [2, 255]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [2, 50]
      }
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [2, 50]
      }
    },
    complementary: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: false
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Address',
    timestamps: false // Enables createdAt and updatedAt automatically
  }
);

Address.hasOne(Country, {
  foreignKey: 'countryId'
});

Country.belongsTo(Address);

Address.hasOne(User, {
  foreignKey: 'userId'
});

User.belongsTo(Address);

export default Address;
