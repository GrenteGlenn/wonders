import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import CustomLogger from './lib/logger'
import morganMiddleware from './config/morganMiddleware'


const app: Express = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morganMiddleware)

app.get('/', (req: Request, res: Response) => {

  CustomLogger.error('This is an error log')
  CustomLogger.warn('This is a warn log')
  CustomLogger.info('This is a info log')
  CustomLogger.http('This is a http log')
  CustomLogger.debug('This is a debug log')

  res.json({ message: 'Hello World!' })
})

app.listen(8080, async () => {
  console.log('Server is running at http://localhost:8080')
})