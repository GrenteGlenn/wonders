'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import ResetPasswordInterface from '../src/interfaces/ResetPasswordInterface';

interface ResetPasswordCreationAttributes extends Optional<ResetPasswordInterface, 'id'> {
}

class ResetPassword extends Model<ResetPasswordInterface, ResetPasswordCreationAttributes>
  implements ResetPasswordInterface {
  declare id: number;
  declare token: string;
  declare readonly created_at: Date;
  declare readonly expired_at: Date;
  declare user_id: number;

  get getToken(): String | null {
    const value = this.getDataValue('token');
    return value as String;
  }
}

ResetPassword.init(
  {
    token: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      get() {
        const value = this.getDataValue('token');
        return value ? value : null;
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'ResetPassword',
    timestamps: false // Enables createdAt and updatedAt automatically
  }
);

export default ResetPassword;
