const request = require('supertest');
const { expect } = require('chai');

require('../helpers/testSetup');

const app = require('../../app.js');

describe('User', async () => {
  it('root path returns reminder to update route', async () => {
    const res = await request(app)
      .get('/users')
      .expect(200);

    expect(res.err).to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(res.text).to.equal('respond with a resource');
  });

  it('can sign up', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        firstName: 'Elowyn',
        lastName: 'Platzer Bartel',
        email: 'elowyn@example.com',
        birthYear: 2015,
        student: true,
        password: 'password',
      })
      .expect(200);

    expect(res.cookie).not.to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(res.cookie).toBe('undefined');
    expect(res.body.user.id).not.toBe(undefined);
    expect(res.body.user.firstName).toEqual('Elowyn');
    expect(res.body.user.lastName).toEqual('Platzer Bartel');
    expect(res.body.user.email).toEqual('elowyn@example.com');
    expect(res.body.user.birthYear).toEqual(2015);
    expect(res.body.user.student).toEqual(true);

    expect(res.body.user.passwordDigest).toEqual(undefined);
    expect(res.body.user.createdAt).toEqual(undefined);
    expect(res.body.user.updatedAt).toEqual(undefined);
  });
});
