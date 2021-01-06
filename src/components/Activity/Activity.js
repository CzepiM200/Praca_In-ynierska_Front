import "./_activity.scss";
import { trainingsRequest } from "../../helpers/ApiRequests"
import { trainingType } from "../../helpers/ApplicationTypes"
import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Header from "../Header/Header";

const Activity = (props) => {
  const { user } = props;
  const [firstLoad, setFirstLoad] = useState(false);
  const [acitivityList, setAcitivityList] = useState([]);

  const setActivityListItems = () => {
    return acitivityList.map((item, index) => 
        <div className="activity__window_item" key={index}>
            <div className="activity__window_item-top">
            <p><span>Nazwa:</span> {item.trainingName}</p>
            </div>
            <div className="activity__window_line"></div>
            <div className="activity__window_item-bottom">
                <div className="activity__window_item-left">
                    <p><span>Czas:</span> {item.activityTime} s</p> 
                    <p><span>Dystans:</span> {item.distance} m</p>
                    <p><span>Rozpoczęty:</span> {item.startTime} s</p> 
                    <p><span>Zakończony:</span> {item.endTime} s</p> 
                </div>
                <div className="activity__window_item-right">
                    <p><span>Typ:</span> {trainingType(item.trainingType)}</p> 
                    <p><span>Zdobyty szczyt:</span> {item.place}</p>
                    <p><span>Region:</span> {item.region}</p>
                    
                </div>
            </div>      
            <div className="activity__window_line"></div>   
            <div className="activity__window_item-description">
                <p>{item.trainingDescription}</p>
            </div>      
        </div>
    );
  }

  if(!firstLoad) {
    trainingsRequest(user, {page: 1, number: 10}, setAcitivityList)
    setFirstLoad(true)
  }

  return (
    <section className="activity">
      <Header user={user}/>
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
                {setActivityListItems()}
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
