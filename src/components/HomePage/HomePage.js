import "./_homePage.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const HomePage = (props) => {
  
  return (
    <section className="home-page">
      <Header />
    </section>
  );
};

export default HomePage;