import { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Search = ({ favouriteFilms, setFavouriteFilms }) => {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("Batman");
  const [inputText, setInputText] = useState("");

  const changeHandler = (event) => {
    setInputText(event.target.value);
  };
  const addSearch = (filmSearch) => {
    if (filmSearch === "") {
    } else {
      const storedSearch = filmSearch;
      setSearchMovie(storedSearch);
      setInputText("");
    }
  };
  const addFavourite = (film) => {
    if (
      favouriteFilms.find(
        (currentFilm) => currentFilm.imdbID === film.imdbID
      ) === undefined
    ) {
      const archive = [...favouriteFilms];
      archive.push(film);
      setFavouriteFilms(archive);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const movieRequest = await fetch(
        `http://www.omdbapi.com/?s=${searchMovie}&apikey=79f0c84f`
      );
      const movieData = await movieRequest.json();
      setMovies(movieData.Search);
    };
    fetchData();
  }, [searchMovie]);

  return (
    <div className="App">
      <h1>
        <u>Mullaney Movie Searcher</u>
      </h1>
      <div className="searchBar">
        <input
          id="input"
          type="text"
          value={inputText}
          onChange={changeHandler}
        />
        <button id="search" onClick={() => addSearch(inputText)}>
          Search
        </button>
      </div>
      <div className="searchResults">
        <h1 className="searchTitle">
          <u>Top 10 Search Results</u>
        </h1>
        {movies.map((currentMovie, index) => {
          return (
            <Movie
              key={index}
              movieInfo={currentMovie}
              favFunc={addFavourite}
            />
          );
        })}
      </div>
    </div>
  );
};
const Movie = ({ movieInfo, favFunc }) => {
  const [modal, setModal] = useState(false);
  const [movie, setMovie] = useState({});

  const openModal = async () => {
    const movieRequest = await fetch(
      `http://www.omdbapi.com/?i=${movieInfo.imdbID}&apikey=79f0c84f`
    );
    const movieData = await movieRequest.json();
    setMovie(movieData);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <div className="Movie" onClick={openModal}>
        <img
          className="movieImage"
          src={movieInfo.Poster}
          alt={movieInfo.Title}
        />
      </div>{" "}
      <Modal className="ModalStyle" isOpen={modal} onRequestClose={closeModal}>
        <img className="movieImage" src={movie.Poster} alt={movie.Title} />
        <h2 className="title">
          {movie.Title} ({movie.Year})
        </h2>
        <p className="ratingTitle">Certificate</p>
        <h2 className="rating">{movie.Rated}</h2>
        <p className="releasedTitle">Released</p>
        <h3 className="released">{movie.Released}</h3>
        <p className="runtimeTitle">Runtime</p>
        <h3 className="runtime">{movie.Runtime}</h3>
        <p className="genreTitle">Genre</p>
        <p className="genre">{movie.Genre}</p>
        <p className="directorTitle">Director</p>
        <p className="director">{movie.Director}</p>
        <p className="writerTitle">Writer</p>
        <p className="writer">{movie.Writer}</p>
        <p className="actorsTitle">Actors</p>
        <p className="actors">{movie.Actors}</p>
        <p className="plot">{movie.Plot}</p>
        <p className="awardsTitle">Awards</p>
        <p className="awards">{movie.Awards}</p>
        <button className="favouritesButton" onClick={() => favFunc(movieInfo)}>
          Add to Favourites
        </button>
      </Modal>
    </>
  );
};

export default Search;
