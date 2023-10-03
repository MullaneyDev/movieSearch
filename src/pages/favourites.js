import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Favourites = ({ favouriteFilms, setFavouriteFilms }) => {
  const removeFilm = (clickedIndex) => {
    const archive = [...favouriteFilms];
    archive.splice(clickedIndex, 1);
    setFavouriteFilms(archive);
  };
  return (
    <div className="App">
      <h1>Favourite Films</h1>
      <div className="favouriteFilms">
        {favouriteFilms.map((currentMovie, index) => {
          return (
            <Movie key={index} movieInfo={currentMovie} favFunc={removeFilm} />
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
        <button
          className="favouritesButtonRemove"
          onClick={() => favFunc(movieInfo)}
        >
          Remove from Favourites
        </button>
      </Modal>
    </>
  );
};

export default Favourites;
