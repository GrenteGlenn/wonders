'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Define the many-to-many association between Role and User
      Role.belongsToMany(models.User, {
        through: 'UserRole',
        foreignKey: 'roleId',  // The name of the foreign key in the junction table pointing to Role
        otherKey: 'userId'     // The name of the foreign key in the junction table pointing to User
      });
    }
  }

  Role.init({
    role: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role',
  });

  return Role;
};
