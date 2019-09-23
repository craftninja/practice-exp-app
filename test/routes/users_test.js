const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const app = require('../../app.js');

describe('User path', function() {
  it('returns reminder to update route', function() {
    chai.request(app)
      .get('/users')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.equal('respond with a resource');
      });
  });
});
