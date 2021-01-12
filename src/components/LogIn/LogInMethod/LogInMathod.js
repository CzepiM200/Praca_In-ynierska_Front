import "./_logInMethod.scss";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import { googleLoginRequest } from "../../../helpers/ApiRequests"

const LogInMethod = (props) => {
  const { user, setUser } = props;
  let history = useHistory();

  const successResponseGoogle = (e) => {
    const authorizeData = {
      Email: e.profileObj.email,
      GoogleToken: e.tokenId,
      GoogleId: e.profileObj.googleId,
    };
    googleLoginRequest(authorizeData, setUser)
  }

  const failureResponseGoogle = (e) => {
    alert("Wystąpił błąd w trakcie logowanie przy pomocy Google");
  } 

  useEffect(() => {
    if(user.id !== -1)
      history.push("/");
  }, [user, history]);

  return (
    <>
      <article className="login-method">
        <div className="login-method__window_buttons">
            <div className="login-email__window_top">
                <h1>Wybierz metodę logowania</h1>
            </div>
            <Link to="/login/email">
              <p className="login-method__email">Logowanie z Email</p>
            </Link>           
            <Link to="/login/google">
              <GoogleLogin
              render={renderProps => (
                <p  className="login-method__google" onClick={renderProps.onClick} disabled={renderProps.disabled}>Logowanie z Google</p>
              )}
              clientId="303201248383-b4tn3cojmbf9b1hovndfl13vm8uleans.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={successResponseGoogle}
              onFailure={failureResponseGoogle}
              cookiePolicy={'single_host_origin'}
              />
            </Link>          
          </div>
      </article>
    </>
  );
};

export default LogInMethod;