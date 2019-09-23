const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const app = require('../../app.js');

describe('Root path', function() {
  it('returns greeting', function() {
    chai.request(app)
      .get('/')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.equal('oh hai!');
      });
  });
});
