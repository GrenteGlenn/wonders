import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import * as process from 'process';
import { SequelizeConfig } from '../interfaces/SequelizeConfigInterface';
import Sequelize from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config: SequelizeConfig = require(__dirname + '/../config/config.json')[env];
const db: { [key: string]: ModelCtor<Model> | Sequelize } = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' && // Changez ceci pour .ts si vos modèles sont en TypeScript
      file.indexOf('.test.ts') === -1 // Changez ceci pour .ts si vos tests sont en TypeScript
    );
  })
  .forEach((file: string) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: string) => {
  if ((db[modelName] as ModelCtor<Model>).associate) {
    (db[modelName] as ModelCtor<Model>).associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.organization.hasMany(db.organization_urls, {
  foreignKey: 'organization_id'
})
db.status.hasMany(db.organization_urls, {
  foreignKey: 'status'
})


export default db;
