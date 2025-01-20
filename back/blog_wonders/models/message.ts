'use strict';

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import MessageInterface from '../src/interface/MessageInterface';

interface MessageCreationAttributes extends Optional<MessageInterface, 'id'> {}

class Message extends Model<MessageInterface, MessageCreationAttributes> implements MessageInterface {
  declare id: number;
  declare message: string;
  declare user_id: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}

Message.init(
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    underscored: true,
    modelName: 'Message',
    timestamps: false // Enables createdAt and updatedAt automatically
  }
);

export default Message;
