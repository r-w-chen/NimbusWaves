const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Comment } = require('../../db/models');
const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    //may want to eagerload Comments
    const songs = await Song.findAll();
    console.log(songs);
}));

router.post('/', asyncHandler(async (req, res) => {
    console.log("COMMENTS POST REQ RECEIVED",req.body);
 
}));

router.delete('/', asyncHandler(async (req, res) => {
   console.log("DELETE REQUEST RECEIVED")
}));

router.patch('/', asyncHandler(async (req, res) => {
    console.log("PATCH REQUEST RECEIVED")
  
}));

module.exports = router;