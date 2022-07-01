const express = require('express');
const userController = require('./../Controller/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.removeUser);

module.exports = router;
