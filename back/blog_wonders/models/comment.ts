'use strict';

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import { CommentInterface } from '../src/interfaces/interfaces'
import Subject from './subject';

interface CommentCreationAttributes extends Optional<CommentInterface, 'id'> {}

export default class Comment extends Model<CommentInterface, CommentCreationAttributes> implements CommentInterface {
  declare id: number;
  declare message: string;
  declare user_id: number;
  declare subject: number;
  declare created_at: Date;
  declare updated_at: Date;
}

  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: 'id'
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, 
    {
      sequelize,
      underscored: true,
      modelName: 'Comment',
      timestamps: false
    }
  );

  Comment.belongsTo(Subject, {
    foreignKey: 'subject',
    as: 'subjectDetails'
  });
  
  Subject.hasMany(Comment, {
    foreignKey: 'subject',
    as: 'comments'
  });