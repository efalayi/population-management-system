"use strict";

var _chai = require("chai");

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

var _locationFactory = _interopRequireDefault(require("../../database/factories/locationFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-expressions */
let createdLocations;

const locationWithNoSubLocations = _locationFactory.default.build();

const locationWithSubLocations = _locationFactory.default.build({
  subLocations: 'Ikeja, Maryland'
});

const server = (0, _supertest.default)(_app.default);
describe('Locations endpoints', () => {
  describe('POST /api/v1/locations', () => {
    it('should return error message if no locations details are sent in request', done => {
      server.post('/api/v1/locations').end((error, response) => {
        const {
          errors
        } = response.body;
        (0, _chai.expect)(response.status).to.equal(400);
        (0, _chai.expect)(errors).not.to.undefined;
        (0, _chai.expect)(errors).to.have.property('name', 'Field is required');
        (0, _chai.expect)(errors).to.have.property('numberOfFemales', 'Field is required');
        (0, _chai.expect)(errors).to.have.property('numberOfMales', 'Field is required');
        done();
      });
    });
    it('should return error message if invalid location fields are sent', done => {
      server.post('/api/v1/locations').send({
        name: '1234name',
        numberOfFemales: 'invalidNumber',
        numberOfMales: '-20'
      }).end((error, response) => {
        const {
          errors
        } = response.body;
        (0, _chai.expect)(response.status).to.equal(400);
        (0, _chai.expect)(errors).not.to.undefined;
        (0, _chai.expect)(errors).to.have.property('name', '1234name is not a valid name. Only alphabets are allowed');
        (0, _chai.expect)(errors).to.have.property('numberOfFemales', 'numberOfFemales should be an integer');
        (0, _chai.expect)(errors).to.have.property('numberOfMales', '-20 is not a positive integer');
        done();
      });
    });
    it('should create location in database if payload is valid', done => {
      server.post('/api/v1/locations').send(locationWithNoSubLocations).end((error, response) => {
        const {
          createdLocation
        } = response.body;
        (0, _chai.expect)(response.status).to.equal(201);
        (0, _chai.expect)(createdLocation).to.have.property('name', locationWithNoSubLocations.name);
        (0, _chai.expect)(createdLocation).to.have.property('numberOfFemales', locationWithNoSubLocations.numberOfFemales);
        (0, _chai.expect)(createdLocation).to.have.property('numberOfMales', locationWithNoSubLocations.numberOfMales);
        (0, _chai.expect)(createdLocation).to.have.property('totalResidents');
        done();
      });
    });
    it('should create sublocations in database if sublocations are included in the payload', done => {
      server.post('/api/v1/locations').send(locationWithSubLocations).end((error, response) => {
        const {
          createdLocation
        } = response.body;
        (0, _chai.expect)(response.status).to.equal(201);
        (0, _chai.expect)(createdLocation).to.have.property('name', locationWithSubLocations.name);
        (0, _chai.expect)(createdLocation).to.have.property('numberOfFemales', locationWithSubLocations.numberOfFemales);
        (0, _chai.expect)(createdLocation).to.have.property('numberOfMales', locationWithSubLocations.numberOfMales);
        (0, _chai.expect)(createdLocation).to.have.property('totalResidents');
        (0, _chai.expect)(createdLocation).to.have.property('subLocations');
        (0, _chai.expect)(createdLocation.subLocations[0].name).to.equal('Ikeja');
        done();
      });
    });
  });
  describe('GET /api/v1/locations', () => {
    it('should return locations', done => {
      server.get('/api/v1/locations').end((error, response) => {
        (0, _chai.expect)(response.status).to.equal(200);
        (0, _chai.expect)(response.body).to.have.property('count', 4);
        (0, _chai.expect)(response.body).to.have.property('locations');
        createdLocations = response.body.locations;
        done();
      });
    });
  });
  describe('GET /api/v1/locations/:locationId', () => {
    it('should return an error message if location does not exist', done => {
      server.get('/api/v1/locations/invalidId').end((error, response) => {
        (0, _chai.expect)(response.status).to.equal(404);
        (0, _chai.expect)(response.body).to.have.property('message', 'invalidId does not exist');
        done();
      });
    });
    it('should return an error if locaionId is not a string', done => {
      server.get('/api/v1/locations/-1234').end((error, response) => {
        (0, _chai.expect)(response.status).to.equal(400);
        (0, _chai.expect)(response.body).not.to.have.property('location');
        (0, _chai.expect)(response.body.message).to.equal('LocationId should be a string');
        done();
      });
    });
    it('should return location details if location exists', done => {
      const [location1] = createdLocations;
      server.get(`/api/v1/locations/${location1.id}`).end((error, response) => {
        (0, _chai.expect)(response.status).to.equal(200);
        (0, _chai.expect)(response.body).to.have.property('location');
        (0, _chai.expect)(response.body.location).to.have.property('name', location1.name);
        (0, _chai.expect)(response.body.location).to.have.property('totalResidents', location1.totalResidents);
        done();
      });
    });
  });
  describe('PUT /api/v1/locations/:locationId', () => {
    it('should return an error message if location does not exist', done => {
      server.put('/api/v1/locations/invalidId').send({
        name: 'Update',
        numberOfFemales: 10,
        numberOfMales: 10
      }).end((error, response) => {
        (0, _chai.expect)(response.status).to.equal(404);
        (0, _chai.expect)(response.body).to.have.property('message', 'invalidId does not exist');
        done();
      });
    });
    it('should return error message if location has sub locations', done => {
      const [location1] = createdLocations;
      server.put(`/api/v1/locations/${location1.id}`).send({
        name: 'Update',
        numberOfFemales: 10,
        numberOfMales: 10
      }).end((error, response) => {
        (0, _chai.expect)(response.status).to.equal(400);
        (0, _chai.expect)(response.body).to.have.property('message', `${location1.name} has sub-locations and cannot be updated directly.`);
        done();
      });
    });
    it('should return updated location details if location update is valid', done => {
      const [, location2] = createdLocations;
      server.put(`/api/v1/locations/${location2.id}`).send({
        name: 'Update',
        numberOfFemales: 10,
        numberOfMales: 35
      }).end((error, response) => {
        (0, _chai.expect)(response.status).to.equal(200);
        (0, _chai.expect)(response.body).to.have.property('location');
        (0, _chai.expect)(response.body.location).to.have.property('totalResidents', 45);
        done();
      });
    });
  });
  describe('DELETE /api/v1/locations/:locationId', () => {
    it('should return an error message if location does not exist', done => {
      server.get('/api/v1/locations/invalidId').end((error, response) => {
        (0, _chai.expect)(response.status).to.equal(404);
        (0, _chai.expect)(response.body).to.have.property('message', 'invalidId does not exist');
        done();
      });
    });
    it('should return an error if locaionId is not a string', done => {
      server.get('/api/v1/locations/-1234').end((error, response) => {
        (0, _chai.expect)(response.status).to.equal(400);
        (0, _chai.expect)(response.body).not.to.have.property('deletedLocation');
        (0, _chai.expect)(response.body.message).to.equal('LocationId should be a string');
        done();
      });
    });
    it('should return location details if location exists', done => {
      const [, location2] = createdLocations;
      server.delete(`/api/v1/locations/${location2.id}`).end((error, response) => {
        (0, _chai.expect)(response.status).to.equal(200);
        (0, _chai.expect)(response.body).to.have.property('deletedLocation');
        (0, _chai.expect)(response.body).to.have.property('message', 'Location has been successfully deleted');
        done();
      });
    });
  });
});