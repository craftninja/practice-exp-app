const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/', usersController.create);

module.exports = router;
