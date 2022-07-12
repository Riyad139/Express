const express = require('express');
const userController = require('./../Controller/userController');
const authController = require('./../Controller/authController');
const router = express.Router();

router.route('/signup').post(authController.signUp);
try {
  router.post('/login', authController.logIn);
} catch (err) {
  console.log(err);
}

router
  .route('/')
  .get(authController.isLogin, userController.getAllUser)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(
    authController.isLogin,
    authController.strictTo('admin', 'leader'),
    userController.removeUser
  );

module.exports = router;
