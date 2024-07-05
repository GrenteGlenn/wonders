import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../config/dbConnection';
import OrganizationInterface from '../interfaces/OrganizationInterface';
import UserAnswer from './useranswer';
import Status from './status';

interface OrganizationCreationAttributes extends Optional<OrganizationInterface, 'id'> {}

export default class Organization extends Model<OrganizationInterface, OrganizationCreationAttributes> implements OrganizationInterface {
  public id!: number;
  public userId!: number;
  public statusId!: number;
  // public userAnswerId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Status,
      key: 'id'
    }
  },
  // userAnswerId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: UserAnswer,
  //     key: 'id'
  //   }
  // },
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
  modelName: 'Organization',
  timestamps: true,
});

Organization.belongsTo(Status, {
  foreignKey: 'statusId',
  as: 'status'
});

// Organization.belongsTo(UserAnswer, {
//   foreignKey: 'userAnswerId',
//   as: 'userAnswer'
// });
