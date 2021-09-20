const main = document.getElementById("main");
const showCommentary = document.getElementById("show-commentary");
const searchForm = document.getElementById("search-form");
const search = document.getElementById("search");
const commentaryButton = document.getElementById("commentary-button");
const showCommentaryButton = document.getElementById("show-commentary-button");
const movieTitle = document.getElementById("movie-info-title");
const user_name = document.getElementById("user_name");
const user_rate = document.getElementById("user_rate");
const themeTitle = document.getElementById("theme-title");
const link = window.location.href;
const movieID = link.slice(38, link.length);
const urlMovieDetails = "http://localhost:3003/movie/" + movieID;
const urlSearchMovies = "http://localhost:3003/searchmovies/";
const urlPostCommentary = "http://localhost:3003/commentary";
const urlReadCommentary = "http://localhost:3003/commentary/";

async function getMovie(url) {
    try {
        const result = await axios.get(url);
        resultData = result.data.results;
        return result
    } catch(error) {
        console.log(error)
      }
}
(async () => {
  try {
      const result = await getMovie(urlMovieDetails);
      const movieDetails = result.data;
      showMovie(movieDetails); 
  } catch (error) {
      console.log(error)
  }
})()

async function postCommentary(movieTitle, userName, userRate, userCommentary){
    try {
        return await axios({
            method: 'post',
            url: urlPostCommentary,
            data: {
              movietitleValue: movieTitle,
              usernameValue: userName,
              userrateValue: userRate,
              commentaryValue: userCommentary
            }
          });
    } catch(error) {
        console.log(error)
      }
}

async function readCommentary(url, numberOfComments) {
    try {
        const results = [];
        for(let i = 1; i <= numberOfComments; i++) {
            let result = await axios.get(url+i)
            results.push(result)
        }
        return results
    } catch(error) {
        console.log(error)
    }
}

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { poster_path, title, id, vote_average, overview, release_date } = movie;
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        const linkDetails = "details.html?id=" + id
        const movieYear = release_date.slice(0,4)
        const IMGPATH = "https://image.tmdb.org/t/p/w1280" + poster_path
        movieElement.innerHTML = `
            <a href="${linkDetails}">
            <img src="${IMGPATH}" alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="movie-year">
                <h4 class="year">${movieYear}</h4>
            </div>
            <div class="overview">
                <h3>Overview:</h3>${overview}
            </div>
            </a>
        `;

        main.appendChild(movieElement);
    });
}

function showMovie(movie) {
    main.innerHTML = "";
    const { poster_path, title, vote_average, overview, release_date, genres } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-details");
    let movieGenresString = "• ";
    genres.forEach((genre) => {
        movieGenresString += genre.name + ", ";
    });
    const movieGenres = movieGenresString.slice(0, -2)
    const movieYear = release_date.slice(0,4)
    const movieMonth = release_date.slice(5,7)
    const movieDay = release_date.slice(8,10)
    const IMGPATH = "https://image.tmdb.org/t/p/w1280" + poster_path
    movieElement.innerHTML = `
        <div class="movie-img">
            <img src="${IMGPATH}"/>
        </div>
        <div class="movie-details-info">
                <h3 id="movie-info-title">${title}</h3>
            <div class="movie-info-realease-date">
                <h4 class="release-date">${movieYear}/${movieMonth}/${movieDay}</h4>
            </div>
            <div class="movie-genres">
                <h3>${movieGenres}</h3>
            </div>
                
            <div class="movie-rating">
                <h3 id="movie-rating-title">Rating: </h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
                
            <div class="movie-details-overview">
                <h3>Overview:</h3>${overview}
            </div>
        </div>   
        `;

        main.appendChild(movieElement);
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {

        (async () => {
            try {
                themeTitle.innerText = "Searched Movies"
                const result = await getMovie(urlSearchMovies + searchTerm);
                const searchedMovies = result.data;
                showMovies(searchedMovies)
            } catch (error) {
                console.log(error)
            }
          })()

        search.value = "";
    }
});

commentaryButton.onclick = async function () {
    
        const movietitleValue = document.getElementById("movie-info-title").innerText;
        const usernameValue = user_name.value;
        const commentaryValue = commentary.value;
        const rateValue = user_rate.value;

        if(movietitleValue != 0 && usernameValue != 0 && commentaryValue != 0 && rateValue != 0){
            try {
            await postCommentary(movietitleValue, usernameValue,  rateValue, commentaryValue);
            commentary.value = "";
            user_rate.value = ""
            user_name.value = "";
        } catch (error) {
            console.log(error)
        }
    }
        
  }

  showCommentaryButton.onclick = async function () {
    try {
        showCommentary.innerHTML = ""
        const numberOfComments = 5;
        const results = await readCommentary(urlReadCommentary, numberOfComments);
        const commentariesData = [];
        results.forEach((result) =>{
            commentariesData.push(result.data)
        })
        commentariesData.forEach((commentaryData) =>{
            const { movie_title, user_name, user_rate, commentary, commentary_date } = commentaryData;
            const commentaryElement = document.createElement("div");
            const commentaryDateWithDash = commentary_date.slice(0,10)
            const commentaryDate = commentaryDateWithDash.replaceAll("-", "/")
            commentaryElement.classList.add("commentary-list");
            commentaryElement.innerHTML = `
            <h3 id="commentary-username">${user_name}</h3>
            <h4 id="commentary-rate">${user_rate}/10</h4>
            <p id="commentary-text">${commentary}</p>
            <h5 id="commentary-date">${commentaryDate}</h5>
            `;
            showCommentary.appendChild(commentaryElement);
        });
        

    } catch (error) {
        console.log(error)
    }
  }
