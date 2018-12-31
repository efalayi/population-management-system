import { Router } from 'express'
import locationRouter from './location'

const appRouter = new Router()

appRouter.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Population Management System API'
  })
})

appRouter.use('/locations', locationRouter)

export default appRouter
