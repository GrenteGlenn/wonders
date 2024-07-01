import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import OrganizationInterface from '../interfaces/OrganizationInterface';
import Status from './status';
// import UserAnswer from './userAnswer';
interface OrganizationCreationAttributes extends Optional<Organization, 'id'> { }

export default class Organization extends Model<OrganizationInterface, OrganizationCreationAttributes> implements OrganizationInterface {
  public id!: number;
  public userId!: number;
  public statusId!: number;
  public userAnswerId!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Organization.hasOne(Status, {
  foreignKey: {
    name: 'statusId',
    allowNull: false,
  }
});

// Organization.hasOne(UserAnswer, {
//   foreignKey: {
//     name: 'userAnswerId',
//     allowNull: false,
//   }
// });

Organization.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userAnswerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize: connection,
  modelName: 'Organization',
  timestamps: true,
});
