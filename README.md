# README

### messing around with the newer versions of things, this may end up functionally identical to node express api but with sessions.

### get this puppy up and running:
* Fork, Clone, and yarn install
* Copy `.env.example` to `.env` and update any necessary envs
* Create databases: `$ createdb practice_exp_app_test` AND `$ createdb practice_exp_app_development`
* Run tests: `$ yarn test`
* Run linter: `$ yarn lint`
* Stand it up: `$ yarn start`

### curl
* No cookies: `$ curl http://localhost:3000/`
* Sign up and store a cookie to reuse: `$ curl -c ./tmp/curlCookies -X POST -H "Content-Type: application/json" -d '{"email":"elowyn@example.com", "password": "password", "firstName": "Elowyn", "lastName": "Platzer Bartel", "birthYear": "2015", "student": "true"}' http://localhost:3000/users`
* use a stored cookie: `$ curl -b ./tmp/curlCookies http://localhost:3000/users/me`

### references
* [Express](https://expressjs.com/)
* [Mocha](https://mochajs.org)
* [Chai (just using expect for now... might switch to expect)](https://www.chaijs.com)
* [PG (aka node-postgres)](https://node-postgres.com/)
* [express-session](https://www.npmjs.com/package/express-session) and [connect-pg-simple](https://www.npmjs.com/package/connect-pg-simple)
* [How to use cookies with curl](https://makandracards.com/makandra/48262-how-to-use-cookies-with-curl)
* [Stop using JWT for sessions](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/)


### how did this get started?

1. barebones structure
    * `$ npx express-generator --no-view --git practice-exp-app`, cd into directory, and open in text editor
    * `$ yarn add --dev mocha`
    * `$ yarn add --dev chai`
    * add a dummy test under `test/setup_test.js` to ensure setup is correct:

        ```
        const expect = require('chai').expect

        describe('Basic test', function() {
          it('should equate true to true', function() {
            expect(true).to.equal(false);
          });
        });
        ```

    * add test script to package.json: `"test": "mocha"`
    * run test, change code, run test from here on out...
    * change test to expect true to equal true
1. get rid of view cruft
    * `$ yarn add --dev supertest`
    * Add tests: first under `/test/routes/index_test.js`, second under `test/routes/users_test.js`

        ```js
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
        ```

        ```js
        const request = require('supertest');
        const { expect } = require('chai');

        const app = require('../../app.js');

        describe('User', async () => {
          it('root path returns reminder to update route', async () => {
            const res = await request(app)
              .get('/users')
              .expect(200);

            expect(res.err).to.be.undefined; // eslint-disable-line no-unused-expressions
            expect(res.text).to.equal('respond with a reeeeeesource');
          });
        });
        ```

    * Update index route to get the test passing, then update user test to pass.
    * Remove cruft:
      * view directory and references
      * public directory and references
1. Add a linter
    * `$ yarn add eslint --dev`
    * add lint script to package.json: `"lint": "eslint --init"` and run to create basic setup
    * update script to run linter: "lint": "eslint --ignore-path .gitignore .",
    * continuously run linter after any code changes
    * add `mocha: true` to the `exports.env` section
    * review errors and update repository
