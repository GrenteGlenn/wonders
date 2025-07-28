import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnection';
import { UserSubjectInterface } from '../src/interfaces/interfaces';
import Subject from '../models/subject';

interface UserSubjectAttributes extends Optional<UserSubjectInterface, 'id'> {}

export default class UserSubject
  extends Model<UserSubjectInterface, UserSubjectAttributes>
  implements UserSubjectInterface
{
  declare id: number;
  declare user_id: number;
  declare subject_id: number;
}
UserSubject.init(
  {
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
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Subject,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    underscored: true,
    modelName: 'UserSubject',
    timestamps: false
  }
);

UserSubject.belongsTo(Subject, {
  foreignKey: 'subject_id',
  as: 'subjects'
});

Subject.hasMany(UserSubject, {
  foreignKey: 'subject_id',
  as: 'userLikedSubjects'
});
