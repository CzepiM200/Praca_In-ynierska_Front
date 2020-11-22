import "./_activity.scss";
import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import Header from "../Header/Header";

const Activity = (props) => {
  const acitivityList = [
      {
          type: "Chodzenie po górach",
          time: "6h 1min",
          distance: "21,6km",
          place: "Mały Kozi",
          region: "Tatry"
      },
      {
          type: "Wspinaczka",
          time: "18min",
          distance: "17km",
          place: "Tępa i Ptak",
          region: "Sokoliki"
      },
      {
          type: "Wspinaczka",
          time: "23min",
          distance: "20m",
          place: "Płetwa",
          region: "Sokoliki"
      },
      {
          type: "Chodzenie po górach",
          time: "1h 1min",
          distance: "19,8km",
          place: "Kasprowy",
          region: "Tatry"
      },
      {
          type: "Wspinaczka",
          time: "26min",
          distance: "17m",
          place: "Baba",
          region: "Sokoliki"
      },
  ];

  const setActivityList = () => {
    return acitivityList.map((item) => 
        <div className="activity__window_item">
            <div className="activity__window_item-top">
            <p><span>Typ:</span> {item.type}</p>
            </div>
            <div className="activity__window_line"></div>
            <div className="activity__window_item-bottom">
                <div className="activity__window_item-left">
                    <p><span>Czas:</span> {item.time}</p> 
                    <p><span>Dystans:</span> {item.distance}</p>
                </div>
                <div className="activity__window_item-right">
                    <p><span>Zdobyty szczyt:</span> {item.place}</p>
                    <p><span>Region:</span> {item.region}</p>
                    <p><span></span></p>
                </div>
            </div>               
        </div>
    );
  }

  return (
    <section className="activity container">
      <Header />
      <Route exact path="/activity">
        <acricle className="activity__window">
            <div className="activity__window_top">
                <h2>Lista aktywności</h2>
                <Link to="/activity/add">
                    <p>Dodaj</p>
                </Link>
            </div>
            <div className="activity__window_line"></div>
            <div className="activity__window_items">
                {setActivityList()}
            </div>
        </acricle>
      </Route> 
      <Route exact path="/activity/add">
        <acricle className="activity__window">
            <h2>Dodaj aktywność</h2>
            <div className="activity__window_line"></div>
            <form>
                <div className="activity__window_form-item">
                    <label>Typ: </label>
                    <input type="text"/>
                </div>
                <div className="activity__window_form-item">
                    <label>Czas: </label>
                    <input type="text"/>
                </div>
                <div className="activity__window_form-item">
                    <label>Dystans: </label>
                    <input type="text"/>
                </div>
                <div className="activity__window_form-item">
                    <label>Miejsce: </label>
                    <input type="text"/>
                </div>
                <div className="activity__window_form-item">
                    <label>Region: </label>
                    <input type="text"/>
                </div>
                <div className="activity__window_form-item">
                    <label>Data: </label>
                    <input type="date"/>
                </div>
                <button type="submit">Dodaj</button>
            </form>
        </acricle>
      </Route>  
    </section>
  );
};

export default Activity;
