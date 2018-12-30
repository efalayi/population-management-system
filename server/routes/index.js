import { Router } from 'express'

const appRouter = new Router()

appRouter.get('/', (req, res) => {
  res.send({
    message: 'Welcome to Population Management System API'
  })
})

export default appRouter
