import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import UserQuizIAResultCountryInterface from '../src/interfaces/UserQuizIAResultCountryInterface';

interface UserQuizIAResultCountryCreationAttributes extends Optional<UserQuizIAResultCountryInterface, 'id'> { }

export default class UserQuizIAResultCountry extends Model<UserQuizIAResultCountryInterface, UserQuizIAResultCountryCreationAttributes> implements UserQuizIAResultCountryInterface {
  declare id: number;
  declare countryId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

UserQuizIAResultCountry.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  countryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'Countries',
        key: 'id'
        }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize: connection,
  modelName: 'UserQuizIAResultCountry'
});