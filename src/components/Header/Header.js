import "./_header.scss";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const Header = (props) => {
  const { user, setUser } = props;
  let history = useHistory();

  const onLogout = () => {
    setUser({id: -1});
    history.push('login')
  }

  const generateLoggedOutHeaderSection = () => {
    return (
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
    );
  }

  const generateUserHeaderSection = () => {
    return (
      <div className="header__login">
        <Link to="/">
          <div className="header__login-item"><span>Witaj {user.firstName}!</span></div>
        </Link>{" "}
        <Link onClick={e => {e.preventDefault(); onLogout()}} to="/">
          <div className="header__login-item signup-link">
            Wyloguj
          </div> 
        </Link>
      </div>
    );
  }  

  return (
    <section className="header">
      <header>
        {user.id === -1 ? generateLoggedOutHeaderSection() : generateUserHeaderSection()}
        <nav className="header__nav">
          <Link to="/">
            <div className="header__nav-item">Strona główna</div>
          </Link> 
          <Link to="/activity">
            <div className="header__nav-item">Aktywności</div>
          </Link>
          {/* <Link to="/plans">
            <div className="header__nav-item">Plany</div>
          </Link> */}
          <Link to="/places">
            <div className="header__nav-item">Miejsca</div>
          </Link>
          <Link to="/strava">
            <div className="header__nav-item">STRAVA</div>
          </Link>
        </nav>
      </header>
    </section>
  );
};

export default Header;