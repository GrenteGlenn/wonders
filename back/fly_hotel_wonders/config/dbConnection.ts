import { Sequelize } from 'sequelize'
import 'dotenv/config'

const dbname = process.env.DB_NAME as string
const dbuser = process.env.DB_USER as string
const dbpassword = process.env.DB_PASS as string
const dbhost = process.env.DB_HOST
const dbdialect = process.env.DIALECT as string | any
console.log(dbname, dbuser, dbpassword);

const sequelizeConnection = new Sequelize(
  dbname,
  dbuser,
  dbpassword,
  {
    host: dbhost,
    dialect: dbdialect,
    define: {
      underscored: true,
      timestamps: true
    }
  }
);

export default sequelizeConnection