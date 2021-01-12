import "./_logIn.scss";
import React, { useState } from "react";
//import { ReactComponent as DecorationIcon } from "../../images/svg/Decoration.svg";
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import LogInEmail from "./LogInEmail/LogInEmail";
import LogInMethod from "./LogInMethod/LogInMathod";


const LogIn = (props) => {
  const { user, setUser } = props;

  

  return (
    <>
      <Header user={user}/>
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