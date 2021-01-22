import "./_strava.scss";
import React, { useEffect, useState } from "react";
import { Route, useHistory  } from "react-router-dom";
import Header from "../Header/Header";
import { allSimpleItemsRequest, addTrainingRequest } from "../../helpers/ApiRequests"
import { findPlacesByRegionId, findRoutesByPlaceId } from "../../helpers/RegionsMethods"
import axios from "axios"
import { CalculateEndDate } from "../../helpers/DateAndTime";


const Strava = (props) => {
  const { user, setUser } = props
  const [firstLoad, setFirstLoad] = useState(false) 
  const [activitiesList, setActivitiesList] = useState([])
  const [newTraining, setNewTraining] = useState({mode: -1})
  const [itemList, setItemList] = useState({regions: [], places: [], routes: []})
  const [selectedRegion, setSelectedRegion] = useState(-1)
  const [selectedPlace, setSelectedPlace] = useState(-1)
  const [selectedRoute, setSelectedRoute] = useState(-1)
  const [placesList, setPlacesList] = useState([])
  const [routesList, setRoutesList] = useState([])
  const [stravaToken, setStravaToken] = useState({access_token: "", refresh_token: "", token_type: "", id: -1, firstname: "", lastname: ""})
  let history = useHistory();

  const refreshAllItems = () => {
    allSimpleItemsRequest(user, setItemList)
  }

  const onRegionSelect = (reg) => {
    setSelectedRegion(+reg)
  }

  const onPlaceSelect = (pla) => {
    setSelectedPlace(+pla)
  }

  const onRouteSelect = (rou) => {
    setSelectedRoute(+rou)
  }

  const saveUser = () => {
    localStorage.setItem('user', JSON.stringify(user))
  }
 
  const tokenExchange = (code) => {
    const config = {
      method: 'post',
      url: `https://www.strava.com/oauth/token?client_id=56751&client_secret=6940bfbe9404b4e88ebea86eb2bff5f78005c3d1&code=${code}&grant_type=authorization_code`,
      headers: { }
    };

    axios(config)
    .then((response) => {
      const data = response.data; 
      const token = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
        id: data.athlete.id,
        firstname: data.athlete.firstname,
        lastname: data.athlete.lastname
      }
      setStravaToken(token);
    })
    .catch((error) => {
      alert("W trakcie wymiany kodu na token, wystąpił błąd")
    });
  }

  const restoreUser = () => {
    const userObject = JSON.parse(localStorage.getItem('user')) 
    setUser(userObject)
    localStorage.removeItem('user')
    
    const regCode = new RegExp("code=[a-z0-9]+")
    const codeArray = regCode.exec(window.location.href);
    if(Array.isArray(codeArray) && codeArray.length === 1) {
        const code = codeArray[0].substr(5)
        tokenExchange(code)
    }
  }

  const setActivityForm = (training) => {
    setNewTraining({...training, mode: 1})
    refreshAllItems()
    history.push('/strava/add')
  }

  const addActivity = (e) => {
    e.preventDefault()
    const callBackFunction = (error) => {
      if (!error)
        history.push('/activity')
      else 
        alert("W trakcie dodawania treningu wystąpił błąd");
    }

    const training = {
        trainingType: 3,
        trainingName: newTraining.name, 
        trainingDescription: "Trening pobrany z serwisu strava",
        startTime: `${newTraining.start_date.slice(0,10)} ${newTraining.start_date.slice(11,13)}:${newTraining.start_date.slice(14,16)}:${newTraining.start_date.slice(17,19)}`,
        endTime: CalculateEndDate(newTraining.start_date, newTraining.elapsed_time/60),
        activityTime: Math.floor(newTraining.elapsed_time/60),
        distance: Math.floor(newTraining.distance),
        routeId: +selectedRoute, 
    } 
 
    addTrainingRequest(user, training, callBackFunction)
  }
 
  const getStravaCode = () => {
    saveUser();
    window.location.replace("https://www.strava.com/oauth/authorize?client_id=56751&response_type=code&redirect_uri=http://localhost:3000/strava&approval_prompt=force&scope=activity:read_all");
  }
 
  const setActivityListItems = () => { 
    return activitiesList.map((item, index) => 
        <div className="activity__window_item" key={index}>
            <div className="activity__window_item-top"> 
              <p>{item.name}</p> 
              <div className="activity__window_controll-buttons">
                <p onClick={() => setActivityForm(item)} className="btn btn-secondary">Dodaj</p>
              </div>
            </div>
            <div className="activity__window_line"></div>
            <div className="activity__window_item-bottom">
                <div className="activity__window_item-left">
                  <p><span>Rozpoczęty:</span> {item.start_date_local}</p> 
                  <p><span>Czas:</span> {item.elapsed_time} s</p>
                </div>
                <div className="activity__window_item-right">
                  <p><span>Typ:</span> {item.type}</p> 
                  <p><span>Dystans:</span> {item.distance} m</p>
                </div>
            </div>         
        </div>
    );
  }

  useEffect(() => {
    if (user.id === -1)
      if(localStorage.getItem('user') === "")
        history.push("/login")
    else if(!firstLoad) {
      setFirstLoad(true)
    }
  }, [user, firstLoad, history]);

  useEffect(() => {
    if(user.id === -1)
      restoreUser() 
  }, [])

  useEffect(() => {
    if(stravaToken.access_token !== "") {
      axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${stravaToken.access_token}`)
      .then((response) => {
        const data = response.data; 
        setActivitiesList(data)
      })
      .catch((error) => {
        alert("W trakcie pozyskiwania aktywności ze strony strava.com, wystąpił błąd")
      });
    }
  }, [stravaToken])

  useEffect(() => {
    if(itemList.regions.length > 0) {
      const places = findPlacesByRegionId(itemList.places, itemList.regions[0].regionId)
      setPlacesList(places)
      setSelectedPlace(places[0].placeId)
      const routes = findRoutesByPlaceId(itemList.routes, selectedRoute)
      setRoutesList(routes)
      if(routes.length > 0) {
        setSelectedRoute(routes[0].routeId)
      } 
      else {
        setSelectedRoute(-1)
      }
    }
  }, [itemList])

  useEffect(() => {
    const places = findPlacesByRegionId(itemList.places, selectedRegion)
    if(places.length > 0) {
      setPlacesList(places)
      setSelectedPlace(places[0].placeId)
      const routes = findRoutesByPlaceId(itemList.routes, selectedRoute)
      setRoutesList(routes)
      if(routes.length > 0) {
        setSelectedRoute(routes[0].routeId)
      } 
      else {
        setSelectedRoute(-1)
      }
    }
    else {
      setPlacesList([])
      setSelectedPlace(-1)
      setRoutesList([])
      setSelectedRoute(-1)
    }
    
  }, [selectedRegion])

  useEffect(() => {
    const routes = findRoutesByPlaceId(itemList.routes, selectedPlace)
    setRoutesList(routes)
    if(routes.length > 0)
      setSelectedRoute(routes[0].routeId)
    
  }, [selectedPlace])

  console.log(selectedRoute);
  return (
    <> 
      <Header user={user} setUser={setUser}/>
      <Route exact path="/strava/add">
        <section className="strava">
          <article className="strava__window">
            <div className="strava__window_top">
              <h2>Wprowadź nową aktywność</h2>
              <p onClick={() => {setNewTraining({mode: -1});history.push('/strava')}} className="btn btn-secondary">Anuluj</p>
            </div> 
            <div className="strava__window_line"></div>
            <form onSubmit={addActivity}>
              <div className="strava__window_form-item">
                  <label>Nazwa treningu: </label>
                  <p>{newTraining.name}</p>
              </div>
              <div className="strava__window_form-item">
                  <label>Typ treningu: </label>
                  <p>{newTraining.type}</p>
              </div>
              <div className="strava__window_form-item">
                  <label>Dystans: </label>
                  <p>{newTraining.distance} m</p>
              </div>
              <div className="strava__window_form-item">
                  <label>Start: </label>
                  <p>{newTraining.start_date_local}</p>
              </div>
              <div className="strava__window_form-item">
                  <label>Czas: </label>
                  <p>{Math.floor(newTraining.elapsed_time/60)} min</p>
              </div> 
              <div className="activity__window_form-item">
                <label>Region: </label>
                <select onChange={(e) => onRegionSelect(e.target.value)} value={selectedRegion} className="custom-select">
                  {itemList.regions.map((item, index) => {
                    if(index === 1)
                      return <option defaultValue value={item.regionId} key={index}>{item.regionName}</option>;
                    else 
                      return <option value={item.regionId} key={index}>{item.regionName}</option>
                  })}
                </select>
              </div> 
              <div className="activity__window_form-item">
                <label>Miejsce: </label>
                <select onChange={(e) => onPlaceSelect(e.target.value)} value={selectedPlace} className="custom-select">
                  {placesList.map((item, index) => {
                    if(index === 1)
                      return <option defaultValue value={item.placeId} key={index}>{item.placeName}</option>;
                    else 
                      return <option value={item.placeId} key={index}>{item.placeName}</option>
                  })}
                </select>
              </div> 
              <div className="activity__window_form-item">
                <label>Droga: </label>
                <select onChange={(e) => onRouteSelect(e.target.value)} value={selectedRoute} className="custom-select">
                  {routesList.map((item, index) => {
                    if(index === 1)
                      return <option defaultValue value={item.routeId} key={index}>{item.routeName}</option>;
                    else 
                      return <option value={item.routeId} key={index}>{item.routeName}</option>
                  })}
                </select>
              </div> 
              <button disabled={selectedRoute === -1} className="btn btn-secondary" type="submit">Dodaj</button>
            </form>
          </article>  
        </section> 
      </Route>
      <Route path="/strava">
        {newTraining.mode === -1 ? <section className="strava">
          <article className="strava__window">
            <div className="strava__window_top">
              <h2>Lista aktywności</h2>
              <p onClick={() => getStravaCode()} className="btn btn-secondary">Pobierz wyniki z strava.com</p>
            </div>
            <div className="strava__window_line"></div>
            <div className="activity__window_items">
              {setActivityListItems()}
            </div>
          </article>  
        </section> : null}
      </Route>
    </>
  );
};

export default Strava; 