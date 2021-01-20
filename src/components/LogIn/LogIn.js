import "./_logIn.scss";
import React from "react";
import { Route  } from "react-router-dom";
import LogInEmail from "./LogInEmail/LogInEmail";
import LogInMethod from "./LogInMethod/LogInMathod";


const LogIn = (props) => {
  const { user, setUser } = props;

  return (
    <>
      <section className="login">
        <Route exact path="/login">
           <LogInMethod setUser={setUser} user={user}/>
        </Route>
        <Route path="/login/email">
            <LogInEmail setUser={setUser} user={user}/>
        </Route>
        <Route exact path="./google"> 
        </Route>    
      </section> 
    </>
  );
};

export default LogIn;