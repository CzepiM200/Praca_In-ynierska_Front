import "./_homePage.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Profile from "./Profile/Profile";
import HomePageMenu from "./HomePageMenu/HomePageMenu";

const HomePage = (props) => {
  
  return (
    <section className="home-page bg-1">
        <Header />
      <div className="container home-page__main">
        <Profile />
        <HomePageMenu />
      </div>
    </section>
  );
};

export default HomePage;
