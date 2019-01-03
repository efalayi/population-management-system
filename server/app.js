import express from 'express'
import bodyParser from 'body-parser'
import appRouter from './routes'
import appPaths from '../config/paths'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/static', express.static(`${appPaths.appBuild}/client/static`))
app.use('/api/v1', appRouter)

app.get('/', (req, res) => {
  res.sendFile(`${appPaths.appBuild}/client/index.html`)
})

export default app
