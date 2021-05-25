const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Comment } = require('../../db/models');
const router = express.Router();


router.get('/:songId', asyncHandler(async (req, res) => {
    //may want to eagerload Comments
    const { songId } = req.params;
    const songComments = await Comment.findAll({
        where: { songId },
        include: User
    });

    res.json(songComments);
}));

router.post('/', asyncHandler(async (req, res) => {
    console.log("COMMENTS POST REQ RECEIVED",req.body);
    const { content, userId, songId } = req.body
    let comment = await Comment.create({ content, userId, songId });
    comment = comment.toJSON();
    let associatedUser = await User.findByPk(userId);
    associatedUser = associatedUser.toJSON();
    comment.User = associatedUser;
    console.log(comment)
    res.json(comment);
}));

router.delete('/', asyncHandler(async (req, res) => {
   console.log("DELETE REQUEST RECEIVED")
}));

router.patch('/', asyncHandler(async (req, res) => {
    console.log("PATCH REQUEST RECEIVED")
  
}));

module.exports = router;