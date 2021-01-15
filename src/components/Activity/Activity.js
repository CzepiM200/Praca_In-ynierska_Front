import "./_activity.scss";
import { trainingsRequest, regionsRequest, routesByPlaceRequest } from "../../helpers/ApiRequests"
import { trainingType, scaleType } from "../../helpers/ApplicationTypes"
import React, { useState, useEffect } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import Header from "../Header/Header";

const Activity = (props) => {
  const { user } = props;
  const [firstLoad, setFirstLoad] = useState(false);
  const [acitivityList, setAcitivityList] = useState([]);
  const [regionsList, setRegionList] = useState([]);
  const [placesList, setPlacesList] = useState([]);
  const [routesList, setRoutesList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({region: -1, place: -1, route: -1});
  let history = useHistory();

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
                    <p><span>Rozpoczęty:</span> {item.startTime}</p> 
                    <p><span>Zakończony:</span> {item.endTime}</p> 
                </div>
                <div className="activity__window_item-right">
                    <p><span>Typ:</span> {trainingType(item.trainingType)}</p> 
                    <p><span>Trasa:</span> {item.route.routeName}</p>
                    <p><span>Skala:</span> {scaleType(item.route.scale)}</p>
                    <p><span>Wycena:</span> {item.route.rating}</p>
                </div>
            </div>      
            <div className="activity__window_line"></div>   
            <div className="activity__window_item-description">
                <p>{item.trainingDescription}</p>
            </div>      
        </div>
    );
  }

  const onRegionSelect = (e) => {
    setSelectedOptions({...selectedOptions, region: Number(e.target.value)});

    const selectedRegion = regionsList.find(r => r.regionId === Number(e.target.value));
    if(selectedRegion.places.length > 0) {
      setPlacesList(selectedRegion.places);
      setSelectedOptions({...selectedOptions, region: Number(selectedRegion.regionId), place: Number(selectedRegion.places[0].placeId) });
      setRoutesList([]);
    }
    else {
      setPlacesList([]);
      setRoutesList([]);
      setSelectedOptions({region: Number(selectedRegion.regionId), place: -1, route: -1});
    }
  }

  const onPlacesSelect = (e) => {
    setSelectedOptions({...selectedOptions, place: Number(e.target.value)});
    // REQUEST
    routesByPlaceRequest(user, e.target.value, setRoutesList);
  }

  const onRouteSelect = (e) => {
    setSelectedOptions({...selectedOptions, route: Number(e.target.value)});
  }

  const onAdd = (e) => {
    e.preventDefault();
    console.log(e);
  }

  useEffect(() => {
    if (user.id === -1)
      history.push("/login")
    else if(!firstLoad) {
      trainingsRequest(user, {page: 1, number: 10}, setAcitivityList)
      regionsRequest(user, {page: 1, number: 100}, setRegionList)
      setFirstLoad(true)
    }
  }, [user, firstLoad, history]);

  useEffect(() => {
    if (regionsList.length > 0) {
      setPlacesList(regionsList[0].places);
      if(regionsList[0].places.length === 0)
        setSelectedOptions({...selectedOptions, region: Number(regionsList[0].regionId)});
      else 
        setSelectedOptions({...selectedOptions, region: Number(regionsList[0].regionId), place: regionsList[0].places[0].placeId});
    }
  }, [regionsList]);

  useEffect(() => {
    if(placesList.length > 0) {
      routesByPlaceRequest(user, selectedOptions.place, setRoutesList);
    }
  }, [placesList]);

  useEffect(() => {
    if(routesList.length > 0) {
      setSelectedOptions({...selectedOptions, route: Number(routesList[0].routeId)});
    }
  }, [routesList]);
  
  return (
    <section className="activity">
      <Header user={user}/>
      <Route exact path="/activity">
        <article className="activity__window">
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
        </article>
      </Route> 
      <Route exact path="/activity/add">
        <article className="activity__window">
            <h2>Dodaj aktywność</h2>
            <div className="activity__window_line"></div>
            <form onSubmit={onAdd}>
              <div className="activity__window_form-left">
              <div className="activity__window_form-item">
                    <label>Nazwa treningu: </label>
                    <input type="text" className="form-control"/>
                </div>
                {/* <div className="activity__window_form-item">
                    <label>Czas treningu: </label>
                    <input type="time" className="form-control"/>
                </div> */}
                <div className="activity__window_form-item">
                    <label>Dystans: </label>
                    <input type="text" className="form-control"/>
                </div>
                <div className="activity__window_form-item">
                  <label>Region: </label>
                  <select disabled={regionsList.length <= 0} className="custom-select" onChange={onRegionSelect}>
                    {regionsList.map((item, index) => {
                      if(index === 1)
                        return <option defaultValue value={item.regionId} key={index}>{item.regionName}</option>;
                      else 
                        return <option value={item.regionId} key={index}>{item.regionName}</option>
                    })}
                  </select>
                </div>
                <div className="activity__window_form-item">
                  <label>Miejsce: </label>
                  <select disabled={selectedOptions.region === -1 || placesList.length === 0} className="custom-select" onChange={onPlacesSelect}>
                    {placesList.map((item, index) => {
                      if(index === 1)
                        return <option defaultValue value={item.placeId} key={index}>{item.placeName}</option>;
                      else 
                        return <option value={item.placeId} key={index}>{item.placeName}</option>
                    })}
                  </select>
                </div>
                <div className="activity__window_form-item">
                  <label>Trasa: </label>
                  <select disabled={selectedOptions.place === -1 || routesList.length === 0} className="custom-select" onChange={onRouteSelect}>
                    {routesList.map((item, index) => {
                      if(index === 1)
                        return <option defaultValue value={item.routeId} key={index}>{item.routeName}</option>;
                      else 
                        return <option value={item.routeId} key={index}>{item.routeName}</option>
                    })}
                  </select>
                </div>
                <div className="activity__window_form-item">
                  <label >Notatka: </label>
                  <textarea className="form-control" maxLength="150"/>
                </div>
              </div>

              <div className="activity__window_form-right">
                <div className="activity__window_form-item">
                    <label>Data rozpoczęcia: </label>
                    <input type="date" className="form-control"/>
                </div>
                <div className="activity__window_form-item">
                    <label>Godzina rozpoczęcia: </label>
                    <input type="time" className="form-control"/>
                </div>
                <div className="activity__window_form-item">
                    <label>Data zakończenia: </label>
                    <input type="date" className="form-control"/>
                </div>
                <div className="activity__window_form-item">
                    <label>Godzina zakończenia: </label>
                    <input type="time" className="form-control"/>
                </div>
                <button 
                  disabled={selectedOptions.route === -1}
                  style={{width: "9em"}} 
                  className="btn btn-secondary" 
                  type="submit">
                  Dodaj trening
                </button>
              </div>
            </form>
        </article>
      </Route>  
    </section>
  );
};

export default Activity;
