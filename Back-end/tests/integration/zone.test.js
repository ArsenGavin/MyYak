const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../server');
// const { createZone, clearZoneCollection } = require('../helper/zone');

chai.use(chaiHttp);

describe('Zone Service Suite', () => {
  describe('Create a zone', () => {
    // before((done) => { clearZoneCollection(done) });
    // after((done) => { clearZoneCollection(done) });
    it('Should create a new zone object', (done) => {
      const zone = { name: "", topX: "", topY: "", bottomX: "", bottomY: "" };
      chai.request(server).post('/zone').send(zone).end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(401);
        // expect(res.status).to.equal(201);
        // expect(res.body).to.be.an('object');
        // expect(res.body).to.have.property('_id');
        // expect(res.body).to.have.property('name');
        // expect(res.body).to.have.property('topX');
        // expect(res.body).to.have.property('topY');
        // expect(res.body).to.have.property('bottomX');
        // expect(res.body).to.have.property('bottomY');
        done();
      });
    });
  });

  // describe('Get all zones', () => {
  //   before((done) => { clearZoneCollection(done) });
  //   before((done) => { createZone(done) });
  //   after((done) => { clearZoneCollection(done) });
  //
  //   it('Should return all zones', (done) => {
  //     chai.request(server).get('/zone').end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.be.an('array');
  //       done();
  //     });
  //   });
  // });

  // describe('Get zone by id', () => {
  //   it('Should return a zone object', (done) => {
  //     const zoneId = '';
  //     chai.request(server).get(`/zone?id=${zoneId}`).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.be.an('object');
  //       done();
  //     });
  //   });
  // });
  //
  // describe('Update a zone', () => {
  //   it('Should update a zone object', (done) => {
  //     const zoneId = '';
  //     const zone = {
  //       name: ""
  //     };
  //     chai.request(server).put(`/zone/${zoneId}`).send(zone).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.be.an('object');
  //       expect(res.body.id).to.equal(zoneId);
  //       done();
  //     });
  //   });
  // });
  //
  // describe('Delete a zone', () => {
  //   it('Should delete a zone object', (done) => {
  //     const zoneId = '';
  //     chai.request(server).delete(`/zone/${zoneId}`).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       done();
  //     });
  //   });
  // });
});
