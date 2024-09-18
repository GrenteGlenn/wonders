'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import SessionInterface from '../src/interfaces/SessionInterface';
import Country from './country';

interface SessionCreationAttributes extends Optional<SessionInterface, 'id'> {
}

class Session extends Model<SessionInterface, SessionCreationAttributes>
  implements SessionInterface {
  declare id: number;
  declare token: string;
  declare valid: boolean;
  declare user_id: number;
}

Session.init(
  {
    token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Session',
    timestamps: false // Enables createdAt and updatedAt automatically
  }
);

export default Session;
