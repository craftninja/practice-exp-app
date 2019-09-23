const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const app = require('../../app.js');

describe('Root path', () => {
  it('returns greeting', () => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null; // eslint-disable-line no-unused-expressions
        expect(res).to.have.status(200);
        expect(res.text).to.equal('oh hai!');
      });
  });
});
