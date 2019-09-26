const { expect } = require('chai');

require('../helpers/testSetup');

const User = require('../../models/user');

describe('User', async () => {
  it('email must be unique', async () => {
    await User.create({
      firstName: 'Elowyn',
      lastName: 'Platzer Bartel',
      email: 'elowyn@example.com',
      birthYear: 2015,
      student: true,
      password: 'password',
    })

    const duplicateUser = await User.create({
      firstName: 'Elowyn',
      lastName: 'Platzer Bartel',
      email: 'elowyn@example.com',
      birthYear: 2015,
      student: true,
      password: 'password',
    })

    expect(duplicateUser).to.deep.equal({ errors: ['Email already taken'] });
  });
});
