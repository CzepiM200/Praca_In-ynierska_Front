import "./_mainPage.scss";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";
import LogIn from "../LogIn/LogIn";

const MainPage = (props) => {
    const { URL } = props;
    return (
      <section className="main-page">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <HomePage />
              {/* <HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}  auth={auth} /> */}
            </Route>
            <Route exact path="/login">
              <LogIn />
              {/* <LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}  auth={auth}/> */}
            </Route>
            <Route exact path="/signup">
              {/* <SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}  auth={auth} /> */}
            </Route>
            <Route exact path="/signout">
              {/* <SignOut loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}  auth={auth} /> */}
            </Route>
            <Route exact path="/passitems">
              {/* <PassItems loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser}  auth={auth} /> */}
            </Route> 
          </Switch>
        </BrowserRouter> 
      </section>
    );
  };
  
  export default MainPage;
   