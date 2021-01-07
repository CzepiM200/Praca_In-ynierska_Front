import "./_logInEmail.scss";
import React, { useState } from "react";
import { loginRequest } from "../../../helpers/ApiRequests"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const LogInEmail = (props) => {
  const { user, setUser } = props;
  let history = useHistory();

  const [nick, setNick] = useState("Nati355");
  //const [nickValidation, setNickValidation] = useState(true);
  const [password, setPassword] = useState("Natalia123");
  //const [passwordValidation, setPasswordValidation] = useState(true);

  const handleLogin = async (event) => { 
    const loginData = {
      UserName: nick,
      Password: password,
    };
    await loginRequest(loginData, setUser) && history.push("/")
    console.log("after");
  }

  if (user.id !== -1)
    history.push("/")
  return (  
    <>
      <article className="login-email">
          <div className="login-email__window_top">
            <h1>Zaloguj się</h1>
          </div>
          <form className="login-email__window_form">
            <label>Nazwa użytkownika</label>
            <input name="nick" type="text" value={nick} onChange={e => setNick(e.currentTarget.value)}></input>
            <label>Hasło</label>
            <input name="password" type="password" value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
          </form>
          <div className="login-email__window_buttons">
            <Link to="/signup">
              <p className="login-email__signup">Załóż konto</p>
            </Link>           
            <p className="login-email__login" onClick={handleLogin}>
                Zaloguj się
            </p>       
          </div>
        </article>
    </> 
  );
};

export default LogInEmail;