const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const {multipleFieldsMulterUpload, multipleMulterUpload, singleMulterUpload, multiplePublicFileUpload, singlePublicFileUpload } = require('../../awsS3');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user,
      });
    }),
  );

router.get('/:userId', asyncHandler(async (req, res) => {
  const {userId} = req.params;
  // console.log("GOT USER ID", userId)
  const user = await User.findByPk(userId)

  // console.log(user)
  res.json(user);
}));

const userFields = [
  {name: 'profileImg'},
  {name: 'coverImg'}
]
router.patch('/', multipleFieldsMulterUpload(userFields), asyncHandler(async (req, res) => {
  const { id, username } = req.body;
  let profileImgURL = null;
  if(req.files.profileImg){
    profileImgURL = await singlePublicFileUpload(req.files.profileImg[0]);
  }
  let coverImgURL = null;
  if(req.files.coverImg){
    // console.log(req.files.coverImg);
    coverImgURL = await singlePublicFileUpload(req.files.coverImg[0]);
  }

  const editedUser = await User.findByPk(id);
  editedUser.update({username, profileImgURL, coverImgURL});
  // console.log(editedUser.toJSON());
  res.json(editedUser);
}))

module.exports = router;