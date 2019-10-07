const request = require('supertest');
const { expect } = require('chai');

require('../helpers/testSetup');

const app = require('../../app.js');

describe('User', async () => {
  it('can sign up with unique email', async () => {
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

    expect(res.headers['set-cookie']).not.to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(res.headers['set-cookie'][0]).to.include('connect.sid');
    expect(res.body.user.id).not.to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(res.body.user.firstName).to.equal('Elowyn');
    expect(res.body.user.lastName).to.equal('Platzer Bartel');
    expect(res.body.user.email).to.equal('elowyn@example.com');
    expect(res.body.user.birthYear).to.equal(2015);
    expect(res.body.user.student).to.equal(true);

    expect(res.body.user.passwordDigest).to.equal(undefined);
    expect(res.body.user.createdAt).to.equal(undefined);
    expect(res.body.user.updatedAt).to.equal(undefined);

    const dupEmailRes = await request(app)
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

    expect(dupEmailRes.body.user.id).to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(dupEmailRes.body.user.errors).to.deep.equal(['Email already taken']);
    expect(dupEmailRes.headers['set-cookie']).to.be.undefined; // eslint-disable-line no-unused-expressions
  });

  it('can get own details with proper session cookie', async () => {
    const loginRes = await request(app)
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
    const cookie = loginRes.headers['set-cookie'];

    const properSessionCookie = await request(app)
      .get('/users/me')
      .set('Cookie', cookie)
      .expect(200);

    const properUser = properSessionCookie.body.user;

    expect(properUser.id).not.to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(properUser.firstName).to.equal('Elowyn');
    expect(properUser.lastName).to.equal('Platzer Bartel');
    expect(properUser.email).to.equal('elowyn@example.com');
    expect(properUser.birthYear).to.equal(2015);
    expect(properUser.student).to.equal(true);

    expect(properUser.passwordDigest).to.equal(undefined);
    expect(properUser.createdAt).to.equal(undefined);
    expect(properUser.updatedAt).to.equal(undefined);

    const noSessionCookie = await request(app)
      .get('/users/me')
      .expect(404);

    expect(noSessionCookie.body).to.deep.equal({});

    const badCookie = [
      'connect.sid=s%3AfZh_-T6vaM9oMnbrQZ8-O0gPExG0KVrt.ssYLVoiQWw4oX%2FSTwAOoOhFZU6b3%2BYNGF995iFGEhdTIM; Path=/; Expires=Sun, 27 Oct 2019 03:17:23 GMT; HttpOnly',
    ];

    const badSessionCookie = await request(app)
      .get('/users/me')
      .set('Cookie', badCookie)
      .expect(404);

    expect(badSessionCookie.body).to.deep.equal({});
  });

  it('root path returns reminder to update route', async () => {
    const res = await request(app)
      .get('/users')
      .expect(200);

    expect(res.err).to.be.undefined; // eslint-disable-line no-unused-expressions
    expect(res.text).to.equal('respond with a resource');
  });
});
