const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../server');

chai.use(chaiHttp);

describe('Message Service Suite', () => {
  describe('Get all messages', () => {
    it('Should return all messages', (done) => {
      chai.request(server).get('/message/61967c4d7abc1d9370328bae/discussion').end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(401);
        // expect(res.status).to.equal(200);
        // expect(res.body).to.be.an('array');
        done();
      });
    });
  });

  // describe('Get message by id', () => {
  //   it('Should return a message object', (done) => {
  //     const messageId = '';
  //     chai.request(server).get(`/message?id=${messageId}`).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.be.an('object');
  //       done();
  //     });
  //   });
  // });
  //
  // describe('Create a message', () => {
  //   it('Should create a new message object', (done) => {
  //     const message = {
  //       authorId: "", content: "", parentMessageId: "", vote: 1
  //     };
  //     chai.request(server).post('/message').send(message).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(201);
  //       expect(res.body).to.be.an('object');
  //       expect(res.body).to.have.property('_id');
  //       expect(res.body).to.have.property('content');
  //       expect(res.body).to.have.property('vote');
  //       done();
  //     });
  //   });
  // });
  //
  // describe('Update a message', () => {
  //   it('Should update a message object', (done) => {
  //     const messageId = '';
  //     const message = {
  //       content: ''
  //     };
  //     chai.request(server).put(`/message/${messageId}`).send(message).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       expect(res.body).to.be.an('object');
  //       expect(res.body.id).to.equal(messageId);
  //       done();
  //     });
  //   });
  // });
  //
  // describe('Delete a message', () => {
  //   it('Should delete a message object', (done) => {
  //     const messageId = '';
  //     chai.request(server).delete(`/message/${messageId}`).end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.status).to.equal(200);
  //       done();
  //     });
  //   });
  // });
});
