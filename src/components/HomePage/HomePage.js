import "./_homePage.scss";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Profile from "./Profile/Profile";
import HomePageMenu from "./HomePageMenu/HomePageMenu";

const HomePage = (props) => {
  const { user, setUser } = props;
  let history = useHistory();

  useEffect(() => {
    if (user.id === -1)
      history.push("/login")
  }, [user, history]);
   
  return ( 
    <section className="home-page bg-1">
        <Header user={user} setUser={setUser}/>
      {user.id !== -1 && <div className="container home-page__main">
        {/* <Profile /> */}
        <HomePageMenu user={user} setUser={setUser}/>
      </div>}
    </section>
  );
};

export default HomePage;
