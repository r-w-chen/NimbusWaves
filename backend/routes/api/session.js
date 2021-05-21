const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator'); //used with handleValidationErrors to validate the body of the req
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors,
  ];

//Handle login
router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res, next) => {
      const { credential, password } = req.body;
      //returns user record data if successful
      const user = await User.login({ credential, password });
  
      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }
  
      await setTokenCookie(res, user);
  
      return res.json({
        user,
      });
    }),
  );

// Log out - removes the session token
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

//restore session user  
router.get(
'/',
restoreUser,
(req, res) => {
    const { user } = req;
    if (user) {
    return res.json({
        user: user.toSafeObject()
    });
    } else return res.json({user: null});  //changed from {}
}
);
  
module.exports = router;