import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import appRouter from './routes'
import appPaths from '../config/paths'

const app = express()
const allowedOrigins = process.env.ALLOWED_ORIGINS

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.use('/static', express.static(`${appPaths.appBuild}/client/static`))
app.use('/api/v1', appRouter)

app.get('*', (req, res) => {
  res.sendFile(`${appPaths.appBuild}/client/index.html`)
})

export default app
