const main = document.getElementById("main");
const searchForm = document.getElementById("search-form");
const search = document.getElementById("search");
const themeTitle = document.getElementById("theme-title")
const detailsButton = document.getElementById("details-button")
const urlPopularMovies = "http://localhost:3003/popularmovies"
const urlSearchMovies = "http://localhost:3003/searchmovies/"
const urlPostCommentary = "http://localhost:3003/commentary"

async function getMovies(url) {
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
      const result = await getMovies(urlPopularMovies);
      const popularMovies = result.data;
      showMovies(popularMovies)
  } catch (error) {
      console.log(error)
  }
})()


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
                const result = await getMovies(urlSearchMovies + searchTerm);
                const searchedMovies = result.data;
                showMovies(searchedMovies)
            } catch (error) {
                console.log(error)
            }
          })()

        search.value = "";
    }
});