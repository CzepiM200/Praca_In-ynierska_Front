import "./_logInMethod.scss";
import React, { useState } from "react";
//import { ReactComponent as DecorationIcon } from "../../images/svg/Decoration.svg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const LogInMethod = (props) => {

  return (
    <>
      <article className="login-method">
        <div className="login-method__window_buttons">
            <div className="login-email__window_top">
                <h1>Wybierz metodę logowania</h1>
            </div>
            <Link to="/login/email">
              <p className="login-method__email">Rejestracja z Email</p>
            </Link>           
            <Link to="/login/google">
              <p className="login-method__google">Rejestracja z Google</p>
            </Link>          
          </div>
      </article>
    </>
  );
};

export default LogInMethod;