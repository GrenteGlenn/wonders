'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationUrl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrganisationUrl.hasOne(models.Organization, {
        foreignKey: 'organizationId'
        as: 'organization'
      })
    }
  }
  OrganizationUrl.init({
    url: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'OrganizationUrl',
  });
  return OrganizationUrl;
};