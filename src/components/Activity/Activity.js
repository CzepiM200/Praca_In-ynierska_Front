import "./_activity.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const Activity = (props) => {
  
  return (
    <section className="activity container">
      <Header />
      <acricle className="activity__window">
        <div className="activity__window_top">
            <h2>Lista aktywności</h2>
            <Link to="/activity/add">
                <p>Dodaj</p>
            </Link>
        </div>
        <div className="activity__window_line"></div>
        <div className="activity__window_items">
            <div className="activity__window_item">
                <div className="activity__window_item-top">
                    <p><span>Typ</span>: Chodzenie po górach</p>
                </div>
                <div className="activity__window_line"></div>
                <div className="activity__window_item-bottom">
                    <div className="activity__window_item-left">
                        <p><span>Czas:</span> 31min 23s</p> 
                        <p><span>Dystans:</span> 5,7km</p>
                    </div>
                    <div className="activity__window_item-right">
                        <p><span>Zdobyty szczyt:</span> Giewont</p>
                        <p><span>Region:</span> Tatry</p>
                        <p><span></span></p>
                    </div>
                </div>           
            </div>
        </div>
      </acricle> 
    </section>
  );
};

export default Activity;
