const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const app = require('../../app.js');

describe('User', () => {
  it('root path returns reminder to update route', () => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        expect(err).to.be.null; // eslint-disable-line no-unused-expressions
        expect(res).to.have.status(200);
        expect(res.text).to.equal('respond with a resource');
      });
  });
});
