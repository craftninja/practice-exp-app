const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');
const verifyLoggedInUser = require('../lib/verifyLoggedInUser');


router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/', usersController.create);

router.use(verifyLoggedInUser);
router.get('/me', usersController.me);

module.exports = router;
