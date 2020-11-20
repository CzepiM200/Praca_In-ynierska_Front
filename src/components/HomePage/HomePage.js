import "./_homePage.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Profile from "./Profile/Profile";

const HomePage = (props) => {
  
  return (
    <section className="home-page">
        <Header />
      <div className="container">
        <Profile />
      </div>
    </section>
  );
};

export default HomePage;
