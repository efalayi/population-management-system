/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import request from 'supertest'
import app from '../app'
import LocationFactory from '../../database/factories/locationFactory'

let createdLocations
const locationWithNoSubLocations = LocationFactory.build()
const locationWithSubLocations = LocationFactory.build({
  subLocations: 'Ikeja, Maryland'
})


const server = request(app)
describe('Locations endpoints', () => {
  describe('POST /api/v1/locations', () => {
    it('should return error message if no locations details are sent in request', (done) => {
      server
        .post('/api/v1/locations')
        .end((error, response) => {
          const { errors } = response.body
          expect(response.status).to.equal(400)
          expect(errors).not.to.undefined
          expect(errors).to.have.property('name', 'Field is required')
          expect(errors).to.have.property('numberOfFemales', 'Field is required')
          expect(errors).to.have.property('numberOfMales', 'Field is required')
          done()
        })
    })
    it('should return error message if invalid location fields are sent', (done) => {
      server
        .post('/api/v1/locations')
        .send({
          name: '1234name',
          numberOfFemales: 'invalidNumber',
          numberOfMales: '-20'
        })
        .end((error, response) => {
          const { errors } = response.body
          expect(response.status).to.equal(400)
          expect(errors).not.to.undefined
          expect(errors).to.have.property('name', '1234name is not a valid name. Only alphabets are allowed')
          expect(errors).to.have.property('numberOfFemales', 'numberOfFemales should be an integer')
          expect(errors).to.have.property('numberOfMales', '-20 is not a positive integer')
          done()
        })
    })
    it('should create location in database if payload is valid', (done) => {
      server
        .post('/api/v1/locations')
        .send(locationWithNoSubLocations)
        .end((error, response) => {
          const { createdLocation } = response.body
          expect(response.status).to.equal(201)
          expect(createdLocation).to.have.property('name', locationWithNoSubLocations.name)
          expect(createdLocation).to.have.property('numberOfFemales', locationWithNoSubLocations.numberOfFemales)
          expect(createdLocation).to.have.property('numberOfMales', locationWithNoSubLocations.numberOfMales)
          expect(createdLocation).to.have.property('totalResidents')
          done()
        })
    })
    it('should create sublocations in database if sublocations are included in the payload', (done) => {
      server
        .post('/api/v1/locations')
        .send(locationWithSubLocations)
        .end((error, response) => {
          const { createdLocation } = response.body
          expect(response.status).to.equal(201)
          expect(createdLocation).to.have.property('name', locationWithSubLocations.name)
          expect(createdLocation).to.have.property('numberOfFemales', locationWithSubLocations.numberOfFemales)
          expect(createdLocation).to.have.property('numberOfMales', locationWithSubLocations.numberOfMales)
          expect(createdLocation).to.have.property('totalResidents')
          expect(createdLocation).to.have.property('subLocations')
          expect(createdLocation.subLocations[0].name).to.equal('Ikeja')
          done()
        })
    })
  })

  describe('GET /api/v1/locations', () => {
    it('should return locations', (done) => {
      server
        .get('/api/v1/locations')
        .end((error, response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('count', 4)
          expect(response.body).to.have.property('locations')
          createdLocations = response.body.locations
          done()
        })
    })
  })

  describe('GET /api/v1/locations/:locationId', () => {
    it('should return an error message if location does not exist', (done) => {
      server
        .get('/api/v1/locations/invalidId')
        .end((error, response) => {
          expect(response.status).to.equal(404)
          expect(response.body).to.have.property('message', 'invalidId does not exist')
          done()
        })
    })
    it('should return an error if locaionId is not a string', (done) => {
      server
        .get('/api/v1/locations/-1234')
        .end((error, response) => {
          expect(response.status).to.equal(400)
          expect(response.body).not.to.have.property('location')
          expect(response.body.message).to.equal('LocationId should be a string')
          done()
        })
    })
    it('should return location details if location exists', (done) => {
      const [location1] = createdLocations
      server
        .get(`/api/v1/locations/${location1.id}`)
        .end((error, response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('location')
          expect(response.body.location).to.have.property('name', location1.name)
          expect(response.body.location).to.have.property('totalResidents', location1.totalResidents)
          done()
        })
    })
  })

  describe('PUT /api/v1/locations/:locationId', () => {
    it('should return an error message if location does not exist', (done) => {
      server
        .put('/api/v1/locations/invalidId')
        .end((error, response) => {
          expect(response.status).to.equal(404)
          expect(response.body).to.have.property('message', 'invalidId does not exist')
          done()
        })
    })
    it('should return error message if location has sub locations', (done) => {
      const [location1] = createdLocations
      server
        .put(`/api/v1/locations/${location1.id}`)
        .send({
          name: 'Update',
          numberOfFemales: 10,
          numberOfMales: 10
        })
        .end((error, response) => {
          expect(response.status).to.equal(400)
          expect(response.body).to.have.property('message', `${location1.name} has sub-locations and cannot be updated directly.`)
          done()
        })
    })
    it('should return updated location details if location update is valid', (done) => {
      const [, location2] = createdLocations
      server
        .put(`/api/v1/locations/${location2.id}`)
        .send({
          name: 'Update',
          numberOfFemales: 10,
          numberOfMales: 35
        })
        .end((error, response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('location')
          expect(response.body.location).to.have.property('totalResidents', 45)
          done()
        })
    })
  })

  describe('DELETE /api/v1/locations/:locationId', () => {
    it('should return an error message if location does not exist', (done) => {
      server
        .get('/api/v1/locations/invalidId')
        .end((error, response) => {
          expect(response.status).to.equal(404)
          expect(response.body).to.have.property('message', 'invalidId does not exist')
          done()
        })
    })
    it('should return an error if locaionId is not a string', (done) => {
      server
        .get('/api/v1/locations/-1234')
        .end((error, response) => {
          expect(response.status).to.equal(400)
          expect(response.body).not.to.have.property('location')
          expect(response.body.message).to.equal('LocationId should be a string')
          done()
        })
    })
    it('should return location details if location exists', (done) => {
      const [, location2] = createdLocations
      server
        .delete(`/api/v1/locations/${location2.id}`)
        .end((error, response) => {
          expect(response.status).to.equal(200)
          expect(response.body).to.have.property('location')
          expect(response.body).to.have.property('message', 'Location has been successfully deleted')
          done()
        })
    })
  })
})
