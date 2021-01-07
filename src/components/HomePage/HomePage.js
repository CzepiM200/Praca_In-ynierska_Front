import "./_homePage.scss";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Profile from "./Profile/Profile";
import HomePageMenu from "./HomePageMenu/HomePageMenu";

const HomePage = (props) => {
  const { user } = props;
  let history = useHistory();


  if (user.id === -1)
    history.push("/login")
  return ( 
    <section className="home-page bg-1">
        <Header user={user}/>
      <div className="container home-page__main">
        <Profile />
        <HomePageMenu />
      </div>
    </section>
  );
};

export default HomePage;
