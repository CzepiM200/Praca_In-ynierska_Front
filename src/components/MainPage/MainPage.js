import "./_mainPage.scss";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import LogIn from "../LogIn/LogIn";
import Activity from "../Activity/Activity";
import Place from "../Place/Place";

const MainPage = (props) => {
    const {  user, setUser } = props;
    return (
      <section className="main-page">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <HomePage  user={user} setUser={setUser}/>
            </Route>
            <Route path="/login">
              <LogIn  user={user} setUser={setUser}/>
            </Route>
            <Route exact path="/signup">
              {/* <Register />  user={user} setUser={setUser}*/}
            </Route>
            <Route exact path="/logout">
              {/* <Register />  user={user} setUser={setUser}*/}
            </Route>
            <Route path="/activity">
              <Activity  user={user}/>
            </Route>
            <Route path="/places">
              <Place  user={user} setUser={setUser}/>
            </Route>
          </Switch>
        </BrowserRouter> 
      </section>
    );
  };
  
  export default MainPage;
   