import "./_logOut.scss";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route  } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";

const LogOut = (props) => {
  const {  user, setUser } = props;

  return (
    <>
      <Header user={user}/>
      <section className="login">
       <Route exact path="/login">
            <LogInMethod />
        </Route>
        <Route path="/login/email">
            <LogInEmail setUser={setUser}/>
        </Route>
            <Route exact path="./google"> 
        </Route>    
        
      </section>
    </>
  );
};

export default LogOut;