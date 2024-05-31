import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: 'triplanner',
  user: 'root',
  password: 'root',
  host: 'localhost',
  port: 5432,
  ssl: true,
  clientMinMessages: 'notice',
});