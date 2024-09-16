import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const dbname = process.env.DB_NAME as string;
const dbuser = process.env.DB_USER as string;
const dbpassword = 'root';
const dbhost = process.env.DB_HOST;
const dbdialect = process.env.DB_DIALECT as string | any;

const sequelizeConnection = new Sequelize(dbname, dbuser, dbpassword, {
  host: dbhost,
  dialect: 'postgres',
  define: {
    underscored: true,
    timestamps: true
  }
});

export default sequelizeConnection;
