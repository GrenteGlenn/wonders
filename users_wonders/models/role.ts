'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize: any, DataTypes: { STRING: any; }) => {
  class Role extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */

    static associate(models) {
      models.Role.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: 'roleId',
        otherKey: 'userId'
      })
    }
  }
  Role.init({
    role: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};