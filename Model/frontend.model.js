const { default: axios } = require('axios');

// Function to get Popular Movies
async function getPopularMovies(apiUrlPopularMovies) {
    try{
        const urlPopularMovies = apiUrlPopularMovies;
        const result = await axios.get(urlPopularMovies);
        resultData = result.data.results;
        return resultData
    } catch(error) {
        console.log(error);
    }
   
}

// Functino to get Searched Movies
async function searchMovies(apiUrlSearchTerm) {
    try{
        const urlSearchTerm = apiUrlSearchTerm;
        const result = await axios.get(urlSearchTerm);
        resultData = result.data.results;
        return resultData
    } catch(error) {
        console.log(error)
    }
}

// Functino to get Movie by ID
async function searchMovieID(apiUrlMovie) {
    try{
        const urlMovie = apiUrlMovie;
        const result = await axios.get(urlMovie);
        resultData = result.data;
        return resultData
    } catch(error) {
        console.log(error)
    }
}


module.exports = { getPopularMovies, searchMovies, searchMovieID }