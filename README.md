# README

### messing around with the newer versions of things, this may end up functionally identical to node express api.

### get this puppy up and running:
* Fork, Clone, and yarn install
* run tests: `$ yarn test`
* run linter: `$ yarn lint`
* stand it up: `$ yarn start`

### how did this get made?

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
