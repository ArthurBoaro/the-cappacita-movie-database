const express = require('express');
const router = express.Router();

// Import Commentary Controller
const commentaryModel = require('../../Model/commentary.model');

// Create Commentary
router.post('/commentary', async(req, res) =>{
    const commentaryData = await commentaryModel.commentaryCreate({
        movietitleValue: req.body.movietitleValue,
        usernameValue: req.body.usernameValue,
        userrateValue: req.body.userrateValue,
        commentaryValue: req.body.commentaryValue
    });
    res.send(commentaryData)
});

// Read Commentary by ID
router.get('/commentary/:id', async(req, res) =>{
    res.send(await commentaryModel.commentaryReadID(req.params.id))
});

// Read Commentary by Movie Title
router.get('/commentary/movie/:movieTitle', async(req, res) =>{
    res.send(await commentaryModel.commentaryReadMovieTitle(req.params.movieTitle))
});

// Delete Commentary by ID
router.delete('/commentary/:id', async(req, res) => {
    res.send(await commentaryModel.commentaryDelete(req.params.id))
});

// Update Commentary by ID
router.put('/commentary/:id', async(req, res) => {
    const commentaryData = await commentaryModel.commentaryUpdate(req.params.id, {
        movietitleValue: req.body.movietitleValue,
        usernameValue: req.body.usernameValue,
        userrateValue: req.body.userrateValue,
        commentaryValue: req.body.commentaryValue
    });
    res.send(commentaryData)
})

module.exports = router;