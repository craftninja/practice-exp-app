const request = require('supertest');
const { expect } = require('chai');

const app = require('../../app.js');

describe('Root path', async () => {
  it('returns greeting', async () => {
    const res = await request(app)
      .get('/')
      .expect(200);

    expect(res.err).to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(res.text).to.equal('oh hai!');
  });
});
