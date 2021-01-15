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
  const [enteredText, setEnteredText] = useState({name: "", distance: "", note: "", startDate: "", startTime: "", endDate: "", endTime: ""});
  const [errors, setErrors] = useState({regions: false, time: false, wrongTime: false});
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

  useEffect(() => {
    const tempErrors = {regions: false, time: false, wrongTime: false};

    const startDate = enteredText.startDate
    const startTime = enteredText.startTime
    const endDate = enteredText.endDate
    const endTime = enteredText.endTime

    if(startDate === "" || startTime === "" || endDate === "" || endTime === "") {
      tempErrors.time = true
      tempErrors.wrongTime = false
    }
    else {
      let tempStartDate = new Date(Date.parse(`${startDate}`));
      tempStartDate.setHours(startTime.slice(0, 2));
      tempStartDate.setMinutes(startTime.slice(3, 5));

      let tempEndDate = new Date(Date.parse(`${endDate}`));
      tempEndDate.setHours(endTime.slice(0, 2));
      tempEndDate.setMinutes(endTime.slice(3, 5));
      if(tempEndDate <= tempStartDate){
        tempErrors.wrongTime = true
        tempErrors.time = false
      }
    }

    if(selectedOptions.route === -1) 
      tempErrors.regions = true
    else 
      tempErrors.regions = false
 
    setErrors(tempErrors)
  }, [enteredText, selectedOptions]);
  
  //console.log(enteredText);
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
                    <input type="text" className="form-control" onChange={(e) => setEnteredText({...enteredText, name: e.target.value})}/>
                </div>
                {/* <div className="activity__window_form-item">
                    <label>Czas treningu: </label>
                    <input type="time" className="form-control"/>
                </div> */}
                <div className="activity__window_form-item">
                    <label>Dystans [m]: </label>
                    <input type="number" min="0" max="99999" className="form-control" onChange={(e) => setEnteredText({...enteredText, distance: e.target.value})}/>
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
                  <textarea className="form-control" maxLength="150" onChange={(e) => setEnteredText({...enteredText, note: e.target.value})}/>
                </div>
              </div>

              <div className="activity__window_form-right">
                <div className="activity__window_form-item">
                    <label>Data rozpoczęcia: </label>
                    <input type="date" className="form-control" onChange={(e) => setEnteredText({...enteredText, startDate: e.target.value})}/>
                </div>
                <div className="activity__window_form-item">
                    <label>Godzina rozpoczęcia: </label>
                    <input type="time" className="form-control" onChange={(e) => setEnteredText({...enteredText, startTime: e.target.value})}/>
                </div>
                <div className="activity__window_form-item">
                    <label>Data zakończenia: </label>
                    <input type="date" className="form-control" onChange={(e) => setEnteredText({...enteredText, endDate: e.target.value})}/>
                </div>
                <div className="activity__window_form-item">
                    <label>Godzina zakończenia: </label>
                    <input type="time" className="form-control" onChange={(e) => setEnteredText({...enteredText, endTime: e.target.value})}/>
                </div>
                <button 
                  disabled={errors.regions || errors.time || errors.wrongTime}
                  style={{width: "9em"}} 
                  className="btn btn-secondary" 
                  type="submit">
                  Dodaj trening 
                </button>
                <div className="activity__window_form-errors">
                    <ul style={{color: "#d32f2f"}}>
                      {/* <li>Brak nazwy</li> */}
                      <li style={!errors.regions ? {display: "none"} : null}>Brak wybranego regionu, trasy lub drogi</li>
                      <li style={!errors.time ? {display: "none"} : null}>Brak czasu rozpoczęcia lub zakończenia treningu</li>
                      <li style={!errors.wrongTime ? {display: "none"} : null}>Czas zakończenia treningu nie może wypadać przed jego rozpoczęciem</li>
                    </ul>
                </div>
              </div>
            </form> 
        </article>
      </Route>  
    </section>
  );
};

export default Activity;
