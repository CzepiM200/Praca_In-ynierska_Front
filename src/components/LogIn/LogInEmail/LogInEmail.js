import "./_logInEmail.scss";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LogInEmail = (props) => {

  return (
    <>
      <article className="login-email">
          <div className="login-email__window_top">
            <h1>Zaloguj się</h1>
            {/* <DecorationIcon /> */}
          </div>
          <form className="login-email__window_form">
            <label>Email</label>
            <input name="email" type="email"></input>
            <label>Hasło</label>
            <input name="password" type="password"></input>
          </form>
          <div className="login-email__window_buttons">
            <Link to="/signup">
              <p className="login-email__signup">Załóż konto</p>
            </Link>           
            <p className="login-email__login">
                Zaloguj się
            </p>       
          </div>
        </article>
    </> 
  );
};

export default LogInEmail;