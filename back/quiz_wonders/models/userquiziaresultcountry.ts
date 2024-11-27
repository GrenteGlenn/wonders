import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import UserQuizIAResultCountryInterface from '../src/interfaces/UserQuizIaResultCountryInterface';

interface UserQuizIAResultCountryCreationAttributes extends Optional<UserQuizIAResultCountryInterface, 'id'> {}

export default class UserQuizIAResultCountry
  extends Model<UserQuizIAResultCountryInterface, UserQuizIAResultCountryCreationAttributes>
  implements UserQuizIAResultCountryInterface
{
  declare id: number;
  declare country: number;
  declare created_at: Date;
  declare updated_at: Date;
}

UserQuizIAResultCountry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    country: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Countries',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'UserQuizIAResultCountry'
  }
);
