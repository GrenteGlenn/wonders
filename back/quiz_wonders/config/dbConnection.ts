import { Sequelize } from 'sequelize'
import 'dotenv/config'

const dbname = process.env.DB_NAME as string
const dbuser = process.env.DB_USER as string
const dbpassword = process.env.DB_PASSWORD as string
const dbhost = process.env.DB_HOST
const dbdialect = process.env.DB_DIALECT as string | any

const sequelizeConnection = new Sequelize(
  dbname,
  dbuser,
  dbpassword,
  {
    host: dbhost,
    dialect: dbdialect
  }
)

export default sequelizeConnection