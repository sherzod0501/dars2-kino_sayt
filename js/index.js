const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".select");
const elFormTitle = document.querySelector(".TitleForm");

let FilmBookmark = [];

let storege = window.localStorage;
let getStorege = JSON.parse(storege.getItem("mark"));

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

elMovieList.addEventListener("click", (evt) => {
  if (evt.target.matches(".bookmarks")) {
    let BookmarkId = Number(evt.target.dataset.BookmarkId);
    let foundBookmark = films.find((film) => film.id == BookmarkId);
    if (!FilmBookmark.includes(foundBookmark)) {
      FilmBookmark.push(foundBookmark);
    }
  }
  storege.setItem("mark", JSON.stringify(FilmBookmark));
  elFormTitle.innerHTML = null;
  renderBookmark(FilmBookmark, elFormTitle);
});

elFormTitle.addEventListener("click", (evt) => {
  if (evt.target.matches(".remove-btn")) {
    let DeleteBtnId = Number(evt.target.dataset.DeleteBtnId);
    let founDeleteId = FilmBookmark.findIndex((film) => film.id == DeleteBtnId);
    FilmBookmark.splice(founDeleteId, 1);
    elFormTitle.innerHTML = null;
    storege.setItem("mark", JSON.stringify(FilmBookmark));
    if (FilmBookmark.length === 0) {
      storege.removeItem("mark");
    }
  }
  renderBookmark(FilmBookmark, elFormTitle);
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

    newTitle.textContent = movie.title;
    newYear.textContent = movie.year;
    // elFormTitle.textContent = FilmBookmark.length;

    newButton.textContent = "Watch Trailer";
    newBookmark.textContent = "Bookmarked";

    let genreList = document.createElement("ul");

    newBookmark.dataset.BookmarkId = movie.id;

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

let renderBookmark = function (arr, where) {
  elFormTitle.innerHTML = null;
  arr.forEach((mark) => {
    const newBookmarDiv = document.createElement("div");
    const newName = document.createElement("b");
    const newDeletBtn = document.createElement("button");

    newBookmarDiv.setAttribute(
      "class",
      "buttom mt-3 border border-secondary p-3"
    );
    newName.setAttribute("class", "text fs-5 d-block mb-2");
    newDeletBtn.setAttribute(
      "class",
      " col-3 btn btn-sm btn-danger border border-danger p-2"
    );
    newDeletBtn.classList.add("remove-btn");
    newDeletBtn.dataset.DeleteBtnId = mark.id;
    newDeletBtn.textContent = "Remove";
    newName.textContent = mark.title;

    newBookmarDiv.append(newName);
    newBookmarDiv.append(newDeletBtn);
    where.append(newBookmarDiv);
  });
};
renderBookmark(getStorege, elFormTitle);
