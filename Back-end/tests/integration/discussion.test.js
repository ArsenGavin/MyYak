const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../server');

chai.use(chaiHttp);

describe('Discussion Service Suite', () => {
  describe('Get all discussions', () => {
    it('Should return all discussions', (done) => {
      chai.request(server).get('/discussion/61967c4d7abc1d9370328bae/zone').end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(401);
        // expect(res.status).to.equal(200);
        // expect(res.body).to.be.an('array');
        done();
      });
    });
  });

  // describe('Get discussion by id', () => {
  //   it('Should return a discussion object', (done) => {
  //     const discussionId = '';
  //     chai.request(server).get(`/discussion?id=${discussionId}`).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.be.an('object');
  //       done();
  //     });
  //   });
  // });
  //
  // describe('Create a discussion', () => {
  //   it('Should create a new discussion object', (done) => {
  //     const discussion = {
  //       title: "", authorId: "", vote: 1
  //     };
  //     chai.request(server).post('/discussion').send(discussion).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(201);
  //       expect(res.body).to.be.an('object');
  //       expect(res.body).to.have.property('_id');
  //       expect(res.body).to.have.property('title');
  //       expect(res.body).to.have.property('authorId');
  //       expect(res.body).to.have.property('vote');
  //       done();
  //     });
  //   });
  // });
  //
  // describe('Update a discussion', () => {
  //   it('Should update a discussion object', (done) => {
  //     const discussionId = '';
  //     const discussion = {
  //       title: ''
  //     };
  //     chai.request(server).put(`/discussion/${discussionId}`).send(discussion).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.be.an('object');
  //       expect(res.body.id).to.equal(discussionId);
  //       done();
  //     });
  //   });
  // });
  //
  // describe('Delete a discussion', () => {
  //   it('Should delete a discussion object', (done) => {
  //     const discussionId = '';
  //     chai.request(server).delete(`/discussion/${discussionId}`).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       done();
  //     });
  //   });
  // });
});
