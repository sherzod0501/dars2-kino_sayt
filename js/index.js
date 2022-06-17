const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".select");
const elFormTitle = document.querySelector(".TitleForm");

elResult.textContent = films.length;

elSelect.innerHTML = "";

let renderGenres = function (arr) {
  let uniqe = [];
  arr.map((film) => {
    film.genres.filter((genre) => {
      return !uniqe.includes(genre) ? uniqe.push(genre) : uniqe;
    });
  });

  uniqe.forEach((genre) => {
    let genreOption = document.createElement("option");

    genreOption.textContent = genre;
    genreOption.value = genre;
    elSelect.append(genreOption);
  });
};

let FilmBookmark = [];

elMovieList.addEventListener("click", (evt) => {
  if (evt.target.matches(".bookmarks")) {
    let BookmarkId = Number(evt.target.dataset.BookmarkId);
    let foundBookmark = films.find((film) => film.id == BookmarkId);
    if (!FilmBookmark.includes(foundBookmark)) {
      FilmBookmark.push(foundBookmark);
    }
  }

  elFormTitle.innerHTML = null;

  renderMovies(FilmBookmark, elFormTitle);
});

elFormTitle.addEventListener("click", (evt) => {
  if (evt.target.matches(".remove")) {
    let DeleteId = Number(evt.target.dataset.DeleteId);
    let founDeleteId = FilmBookmark.findIndex((film) => film.id === DeleteId);
    elFormTitle.innerHTML = null;
    films.splice(founDeleteId, 1);
    renderMovies(founDeleteId, elFormTitle);
  }
});

let renderMovies = function (filmArr, where) {
  filmArr.forEach((movie) => {
    //CREATE ELEMENT
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newLanguage = document.createElement("p");
    const newYear = document.createElement("p");
    const newButton = document.createElement("a");
    const newBookmark = document.createElement("button");
    const newBookmarDiv = document.createElement("div");
    const newName = document.createElement("b");
    const newDeletBtn = document.createElement("button");

    //SET ATTTIBUTE
    newLi.setAttribute("class", "card mb-3");
    newLi.style.width = "16rem";
    newImg.classList.add("card-img-top");
    newImg.setAttribute("src", movie.poster);
    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newLanguage.classList.add("card-text");
    newYear.classList.add("card-text");
    newBookmark.setAttribute("class", "bookmarks btn btn-outline-success mt-3");
    newButton.setAttribute("class", "btn btn-danger");
    newButton.setAttribute(
      "href",
      `https://www.youtube.com/watch?v=${movie.youtubeId}`
    );
    newBookmarDiv.setAttribute(
      "class",
      "buttom mt-3 border border-secondary p-3"
    );
    newName.setAttribute("class", "text fs-5 d-block mb-2");
    newDeletBtn.setAttribute(
      "class",
      "remove col-3 btn btn-sm btn-danger border border-danger p-2"
    );

    newBookmarDiv.append(newName, newDeletBtn);
    elFormTitle.append(newBookmarDiv);

    newName.textContent = movie.title;
    newTitle.textContent = movie.title;
    newYear.textContent = movie.year;

    newDeletBtn.textContent = "Remove";
    newButton.textContent = "Watch Trailer";
    newBookmark.textContent = "Bookmarked";

    let genreList = document.createElement("ul");

    newBookmark.dataset.BookmarkId = movie.id;
    newDeletBtn.dataset.DeleteId = movie.id;

    //APPEND
    where.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newYear);
    newDiv.appendChild(newButton);
    newDiv.appendChild(newBookmark);
    newDiv.appendChild(genreList);
  });
};

renderMovies(films, elMovieList);
renderGenres(films);

elForm.addEventListener("submit", (event) => {
  event.preventDefault();

  elMovieList.innerHTML = null;

  let selectValue = elSelect.value;
  let selectedMovie = [];

  films.map((film) => {
    film.genres.includes(selectValue)
      ? selectedMovie.push(film)
      : selectedMovie;
  });

  elResult.textContent = selectedMovie.length;

  renderMovies(selectedMovie, elMovieList);
});
