const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');

describe('User', async () => {
  it('root path returns reminder to update route', async () => {
    const res = await request(app)
      .get('/users')
      .expect(200);

    expect(res.err).to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(res.text).to.equal('respond with a resource');
  });
});
