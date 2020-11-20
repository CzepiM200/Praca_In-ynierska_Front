import "./_header.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  
  return (
    <section className="header">
      <header>
        <div className="header__login">
        <Link to="/login">
          <div className="header__login-item">Zaloguj</div>
        </Link>{" "}
        <Link to="/signup">
          <div className="header__login-item signup-link">
            Załóż konto
          </div> 
        </Link>
        </div>
        <nav className="header__nav">
          <Link to="/">
            <div className="header__nav-item">Aktywności</div>
          </Link>
          <Link to="/">
            <div className="header__nav-item">Plany</div>
          </Link>
          <Link to={{ pathname: "/", hash: "#about" }}>
            <div className="header__nav-item">Miejsca</div>
          </Link>
          <Link to="/">
            <div className="header__nav-item">STRAVA</div>
          </Link>
          <Link to="/">
            <div className="header__nav-item">Profil</div>
          </Link>
        </nav>
      </header>
    </section>
  );
};

export default Header;