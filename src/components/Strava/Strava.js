import "./_strava.scss";
import React from "react";
import { Route  } from "react-router-dom";
import Header from "../Header/Header";

const Strava = (props) => {
  const { user, setUser } = props;

  return (
    <>
      <Header user={user} setUser={setUser}/>
      <section className="strava">
        <article className="strava__window">
            <div className="strava__window_line"></div>
        </article>  
      </section> 
    </>
  );
};

export default Strava; 