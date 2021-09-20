const express = require('express');
const router = express.Router();
require('dotenv').config();
const APIURLTRENDIGMOVIES = process.env.APIURL + "discover/movie?sort_by=popularity.desc&api_key=" + process.env.APIKEY + "&page=1";
const APIURLSEARCH = process.env.APIURL + "search/movie?&api_key=" + process.env.APIKEY  + "&query=";
const APIURLMOVIEBYID = process.env.APIURL + "movie/id?&api_key=" + process.env.APIKEY;

// Import Frontend Controller
const frontendModel = require('../../Model/frontend.model');

// Get Popular Movies Route
router.get('/popularmovies', async(req, res)=>{
    res.send(await frontendModel.getPopularMovies(APIURLTRENDIGMOVIES))
});

// Get Searched Movies Route
router.get('/searchmovies/:searchTerm', async(req, res)=>{
    const urlSearch = APIURLSEARCH + req.params.searchTerm;
    res.send(await frontendModel.searchMovies(urlSearch))
});

// Get Movie By ID
router.get('/movie/:id', async(req, res)=>{
    const urlMovie = APIURLMOVIEBYID.replace("id", req.params.id)
    res.send(await frontendModel.searchMovieID(urlMovie))
});

module.exports = router;