import { Sequelize } from 'sequelize';
import 'dotenv/config';

const dbname = process.env.DB_NAME as string;
const dbuser = process.env.DB_USER as string;
const dbpassword = process.env.DB_PASSWORD as string;
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT as string;
const dbdialect = process.env.DB_DIALECT as string | any;

const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
  host: dbhost,
  dialect: dbdialect,
  port: parseInt(dbport),
  define: {
    timestamps: false
  }
});

export default sequelize;