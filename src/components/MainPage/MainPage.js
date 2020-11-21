import "./_mainPage.scss";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import LogIn from "../LogIn/LogIn";
import Activity from "../Activity/Activity";

const MainPage = (props) => {
    const { URL } = props;
    return (
      <section className="main-page">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route exact path="/signup">
              {/* <HomePage /> */}
            </Route>
            <Route path="/activity">
              <Activity />
            </Route>
          </Switch>
        </BrowserRouter> 
      </section>
    );
  };
  
  export default MainPage;
   