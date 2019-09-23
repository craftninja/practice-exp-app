# README

### messing around with the newer versions of things, this may end up functionally identical to node express api.

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
    * `$ yarn add --dev chai-http`
    * Add tests: first under `/test/routes/index_test.js`, second under `test/routes/users_test.js`

        ```js
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
        ```

        ```js
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
                expect(res.text).to.equal('respond with a reeesource');
              });
          });
        });
        ```

    * Update index route to get the test passing, then update user test to pass.
    * Remove cruft:
      * view directory and references
      * public directory and references
