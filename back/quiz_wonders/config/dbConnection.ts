import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const dbname = process.env.DB_NAME as string
const dbuser = process.env.DB_USER as string
const dbpassword = process.env.DB_PASSWORD as string
const dbhost = process.env.DB_HOST
const dbport = process.env.DB_PORT as number | any

const sequelizeConnection = new Sequelize(
  dbname,
  dbuser,
  dbpassword,
  {
    host: dbhost,
    dialect: 'postgres',
    port: dbport,
    define: {
      underscored: true,
      timestamps: true
    }
  }
);

export default sequelizeConnection;
