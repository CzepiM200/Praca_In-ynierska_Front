import "./_logIn.scss";
import React, { useState } from "react";
//import { ReactComponent as DecorationIcon } from "../../images/svg/Decoration.svg";
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import LogInEmail from "./LogInEmail/LogInEmail";
import LogInMethod from "./LogInMethod/LogInMathod";

const LogIn = (props) => {

  return (
    <>
      <Header />
      <section className="login">
       <Route exact path="/login">
            <LogInMethod />
        </Route>
        <Route path="/login/email">
            <LogInEmail />
        </Route>
            <Route exact path="./google">
        </Route>    
        
      </section>
    </>
  );
};

export default LogIn;