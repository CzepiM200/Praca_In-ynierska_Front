import "./_signUp.scss";
import React, { useState, useEffect } from "react";
import { registerRequest } from "../../helpers/ApiRequests";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  const { user, setUser } = props;
  let history = useHistory();

  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [nickValidation, setNickValidation] = useState(false);
  

  const handleRegister = async (event) => { 
    const callBackFunction = {
      success: (res) => {
        history.push("/")
    },
      error: (error) => {  
        alert(error.response.data);
      }
    }
    const registerData = {
      UserName: nick,
      FirstName: nick, 
      LastName: "?",
      Email: "?",
      Password: password, 
    };

    if(passwordValidation)
    {
        if(nickValidation) 
            registerRequest(registerData, callBackFunction)
        else 
            alert("Długość twojej nazwy powinna mieć przynajmniej 4 znaki")
    }
    else 
        alert("Wprowadzone hasła powinny być identyczne")
  }

  useEffect(() => {
    if (user.id !== -1)
      history.push("/")
  }, [user, history]);

  useEffect(() => {
    password === password2 ? setPasswordValidation(true) : setPasswordValidation(false)
  }, [password, password2]);

  useEffect(() => {
    nick.length > 3 ? setNickValidation(true) : setNickValidation(false)
  }, [nick]);

  return (  
    <> 
    <section className="signup">
      <article className="signup-email">
          <div className="signup-email__window_top">
            <h1>Zarejestruj się</h1>
          </div>
          <form className="signup-email__window_form">
            <label>Nazwa użytkownika</label>
            <input name="nick" type="text" value={nick} onChange={e => setNick(e.currentTarget.value)}></input>
            <label>Hasło</label>
            <input name="password" type="password" value={password} onChange={e => setPassword(e.currentTarget.value)}></input>
            <label>Powtórz hasło</label>
            <input name="password" type="password" value={password2} onChange={e => setPassword2(e.currentTarget.value)}></input>
          </form>
          <div className="signup-email__window_buttons">
            <Link to="/login">
              <p className="signup-email__signup">Zaloguj się</p>
            </Link>           
            <p className="signup-email__registe" onClick={handleRegister}>Załóż konto</p>       
          </div>
        </article>
    </section>
    </> 
  );
};

export default SignUp;