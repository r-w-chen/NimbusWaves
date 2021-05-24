const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {multipleFieldsMulterUpload, multipleMulterUpload, multiplePublicFileUpload, singlePublicFileUpload } = require('../../awsS3');
const { User, Song } = require('../../db/models');
const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    //may want to eagerload Comments
    const songs = await Song.findAll({include: User});
    res.json({songs})
}));

router.get('/user/:userId', asyncHandler(async (req, res) => {
    const {userId} = req.params;
    const userSongs = await Song.findAll({
        where: { userId },
    })
    console.log(userSongs);
    res.json({userSongs})
}))


const songFields = [
    {name: 'audioImg'},
    {name: 'audioFile'}
]
router.post('/', multipleFieldsMulterUpload(songFields) ,asyncHandler(async (req, res) => {
    const {title, genre, description, userId } = req.body;
    const song = Song.build({
        title,
        genre,
        description,
        userId
    })

    const songImgURL = await singlePublicFileUpload(req.files.audioImg[0])
    const audioURL = await multiplePublicFileUpload(req.files.audioFile);

    song.songImgURL = songImgURL;
    song.audioURL = audioURL[0];

    // console.log("SONG IMAGE URL", songImgURL)
    // console.log("SONG URL", audioURL)

    // *** change to create() instead of build/save()
    await song.save(); 
    res.json({song});
}));

router.delete('/', asyncHandler(async (req, res) => {
    //TODO: add and id key to the req to be used for searching here
    //query for song by ID and do song.destroy();
}));

router.patch('/', asyncHandler(async (req, res) => {
    //TODO: query for song by ID and do a song.update()
}));

module.exports = router;