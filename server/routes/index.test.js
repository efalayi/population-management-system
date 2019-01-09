import { expect } from 'chai'
import request from 'supertest'
import app from '../app'

const server = request(app)
describe('GET /api/v1', () => {
  it('should return API welcome message', (done) => {
    server
      .get('/api/v1/')
      .end((error, response) => {
        expect(response.body).to.have.property('message', 'Welcome to Population Management System API')
        done()
      })
  })
})
