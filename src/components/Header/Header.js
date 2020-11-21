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
          <Link to="/activity">
            <div className="header__nav-item">Aktywności</div>
          </Link>
          <Link to="/plans">
            <div className="header__nav-item">Plany</div>
          </Link>
          <Link to="/places">
            <div className="header__nav-item">Miejsca</div>
          </Link>
          <Link to="/strava">
            <div className="header__nav-item">STRAVA</div>
          </Link>
          <Link to="/profile">
            <div className="header__nav-item">Profil</div>
          </Link>
        </nav>
      </header>
    </section>
  );
};

export default Header;