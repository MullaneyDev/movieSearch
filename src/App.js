import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "./pages/search";
import Favourites from "./pages/favourites";
import github from "./images/github.png";
import twitter from "./images/twitter.png";
import mail from "./images/mail.jpg";
import { useState } from "react";

function App() {
  const [favouriteFilms, setFavouriteFilms] = useState([]);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Search</Link>
        <Link to="/favourites">Favourite Films</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Search
              favouriteFilms={favouriteFilms}
              setFavouriteFilms={setFavouriteFilms}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            <Favourites
              favouriteFilms={favouriteFilms}
              setFavouriteFilms={setFavouriteFilms}
            />
          }
        />
      </Routes>
      <footer>
        <div className="brandsig">
          <div className="brandsig-content-center">
            <div className="sig">
              <p>Website created by</p>
            </div>
            <div className="logo">
              <p>{"</> "}</p>
            </div>
            <div className="brand">
              <p>MullaneyDev</p>
            </div>
          </div>
          <div className="brandsig-content-right">
            <a
              href="https://github.com/MullaneyDev"
              target="_blank"
              rel="noreferrer"
            >
              <img src={github} className="icon-style" alt="GitHub Logo" />
            </a>
            <a
              href="https://twitter.com/MullaneyDev"
              target="_blank"
              rel="noreferrer"
            >
              <img src={twitter} className="icon-style" alt="Twitter logo" />
            </a>
            <a href="mailto:matt@mullaneydev.co.uk">
              <img src={mail} className="icon-style" alt="Email icon" />
            </a>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
