import "./_strava.scss";
import React from "react";
import { Route  } from "react-router-dom";

const Strava = (props) => {
  const { user, setUser } = props;

  return (
    <>
      <section className="strava">
        <article className="strava__window">
            <div className="strava__window_line"></div>
        </article>  
      </section> 
    </>
  );
};

export default Strava; 