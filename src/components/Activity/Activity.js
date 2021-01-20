import "./_activity.scss";
import { editTrainingRequest, trainingsRequest, regionsRequest, routesByPlaceRequest, addTrainingRequest, deleteTrainingRequest, allSimpleItemsRequest } from "../../helpers/ApiRequests"
import { GetTimeDifferenceInMinutes, GetFullDate } from "../../helpers/DateAndTime"
import { trainingType, scaleType } from "../../helpers/ApplicationTypes"
import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Header from "../Header/Header";

const Activity = (props) => {
  const { user, setUser } = props;
  const [filters, setFilters] = useState({place: -1, start: ""});
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [itemList, setItemList] = useState({regions: [], places: [], routes: []})
  const [idAdding, setIfAdding] = useState(true);
  const [trainingId, setTrainingId] = useState(0);
  const [firstLoad, setFirstLoad] = useState(false);
  const [acitivityList, setAcitivityList] = useState([]);
  const [regionsList, setRegionList] = useState([]);
  const [placesList, setPlacesList] = useState([]);
  const [routesList, setRoutesList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({region: -1, place: -1, route: -1});
  const [enteredText, setEnteredText] = useState({name: "", distance: "", note: "", startDate: "", startTime: "", endDate: "", endTime: ""});
  const [errors, setErrors] = useState({regions: false, time: false, wrongTime: false});
  const [requestStatus, setRequestStatus] = useState(false);
  let history = useHistory();
  
  const refreshAllItems = () => {
    allSimpleItemsRequest(user, setItemList)
  }

  const refreshTrainingsList = () => {
    trainingsRequest(user, {page: 1, number: 10}, setAcitivityList)
  }

  const onDelete = (id) => {
    if (window.confirm("Czy na pewno chcesz usunąć wybrany trening?")) {
      const callBack = (status) => {
        status ? alert("Usunięto pomyślnie.") : alert("Coś poszło nie tak!")
        refreshTrainingsList()
      }
      deleteTrainingRequest(user, {id: id}, callBack);
    } 
  }

  const onEdit = (item) => {
    history.push('activity/add')
    setIfAdding(false)
    setRegionList([])
    setPlacesList([])
    setRoutesList([{routeId: item.route.routeId, routeName: item.route.routeName}])
    setTrainingId(item.trainingId)
    setEnteredText({
      name: item.trainingName, 
      distance: item.distance, 
      note: item.trainingDescription, 
      startDate: item.startTime.slice(0, 10), 
      startTime: item.startTime.slice(11, 16), 
      endDate: item.endTime.slice(0, 10), 
      endTime: item.endTime.slice(11, 16)})
    setSelectedOptions({region: -1, place: item.route.placeId, route: item.route.routeId})
    console.log(item)
  }

  const clearForm = () => {
    setEnteredText({name: "", distance: "", note: "", startDate: "", startTime: "", endDate: "", endTime: ""});
    setSelectedOptions({region: -1, place: -1, route: -1});
    setFirstLoad(false)
    setTrainingId(-1)
  }

  const setActivityListItems = () => {
    return filteredActivities.map((item, index) => 
        <div className="activity__window_item" key={index}>
            <div className="activity__window_item-top">
              <p>{item.trainingName}</p>
              <div className="activity__window_controll-buttons">
                <p className="btn btn-secondary" onClick={() => onEdit(item)}>Edytuj</p>
                <p className="btn btn-secondary" onClick={() => onDelete(item.trainingId)}>Usuń</p>
              </div>
            </div>
            <div className="activity__window_line"></div>
            <div className="activity__window_item-bottom">
                <div className="activity__window_item-left">
                    <p><span>Czas:</span> {item.activityTime} min</p> 
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
    const distance = enteredText.distance === "" ? 0 : enteredText.distance
    const name = enteredText.name === "" ? `Wycieczka ${enteredText.startDate} o godzinie ${enteredText.startTime}` : enteredText.name
    const note = enteredText.note === "" ? "Brak dodatkowego opisu..." : enteredText.note
    let data;

    if(idAdding)
      data = {
        trainingName: name,
        trainingDescription: note,
        startTime: `${enteredText.startDate} ${enteredText.startTime}:00`,
        endTime: `${enteredText.endDate} ${enteredText.endTime}:00`,
        activityTime: Number(GetTimeDifferenceInMinutes(enteredText.startDate, enteredText.startTime, enteredText.endDate, enteredText.endTime)),
        distance: Number(distance),
        routeId: Number(selectedOptions.route),
      }
    else 
      data = {
        trainingName: name,
        trainingDescription: note,
        startTime: `${enteredText.startDate} ${enteredText.startTime}:00`,
        endTime: `${enteredText.endDate} ${enteredText.endTime}:00`,
        activityTime: Number(GetTimeDifferenceInMinutes(enteredText.startDate, enteredText.startTime, enteredText.endDate, enteredText.endTime)),
        distance: Number(distance),
        trainingId: trainingId
      }


    const seccessCallBack = (status) => {
      if(!status) {
        setRequestStatus(status)
        refreshTrainingsList()
        history.push('/activity');
      }
      else
        setRequestStatus(status)
    }
    if(idAdding)
      addTrainingRequest(user, data, seccessCallBack)
    else 
      editTrainingRequest(user, data, seccessCallBack)
  }

  useEffect(() => {
    if (user.id === -1)
      history.push("/login")
    else if(!firstLoad) {
      refreshAllItems()
      refreshTrainingsList()
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
      const tempStartDate = GetFullDate(startDate, startTime)
      const tempEndDate = GetFullDate(endDate, endTime)

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

  useEffect(() => {
    let tempFilteredActivities = acitivityList;
    if(filters.place !== -1)
      tempFilteredActivities = tempFilteredActivities.filter(act => act.route.placeId === filters.place)

    if(filters.start !== "")
      tempFilteredActivities = tempFilteredActivities.filter(act => act.startTime.slice(0, 10) === filters.start)

    console.log(filters);
    setFilteredActivities(tempFilteredActivities)
  }, [filters]);

  useEffect(() => {
    if(acitivityList.length > 0) {
      setFilteredActivities(acitivityList)
    }
  }, [acitivityList]);

  return (
    <section className="activity">
      <Header user={user} setUser={setUser}/>
      <Route exact path="/activity">
        <article className="activity__window">
            <div className="activity__window_top">
                <h2>Lista aktywności</h2>
                <div className="activity__window_controll">
                  <input onChange={e => setFilters({...filters, start: e.target.value})} value={filters.start} type="date" className="form-control" />
                  <select onChange={e => setFilters({...filters, place: +e.target.value})} value={filters.place} className="custom-select">
                    <option defaultValue value={-1}>Wybierz miejsce...</option> 
                    {itemList.places.map((item) => {
                      return <option value={item.placeId}>{item.placeName}</option>
                    })}
                  </select>
                  <p className="btn btn-secondary" onClick={(e) => {setIfAdding(true); clearForm(); history.push('/activity/add')}}>Dodaj</p>
                </div>
            </div>
            <div className="activity__window_line"></div>
            <div className="activity__window_items">
                {setActivityListItems()}
            </div>
        </article>
      </Route> 
      <Route exact path="/activity/add">
        <article className="activity__window">
            <h2>{idAdding ? "Dodaj aktywność" : "Edytowanie aktywności"}</h2>
            <div className="activity__window_line"></div>
            <form onSubmit={onAdd}>
              <div className="activity__window_form-left">
              <div className="activity__window_form-item">
                    <label>Nazwa treningu: </label>
                    <input value={enteredText.name} type="text" className="form-control" onChange={(e) => setEnteredText({...enteredText, name: e.target.value})}/>
                </div>
                <div className="activity__window_form-item">
                    <label>Dystans [m]: </label>
                    <input value={enteredText.distance} type="number" min="0" max="99999" className="form-control" onChange={(e) => setEnteredText({...enteredText, distance: e.target.value})}/>
                </div>
                <div className="activity__window_form-item">
                  <label>Region: </label>
                  <select value={selectedOptions.region} disabled={regionsList.length <= 0 || !idAdding} className="custom-select" onChange={onRegionSelect}>
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
                  <select value={selectedOptions.place} disabled={selectedOptions.region === -1 || placesList.length === 0 || !idAdding} className="custom-select" onChange={onPlacesSelect}>
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
                  <select value={selectedOptions.route} disabled={selectedOptions.place === -1 || routesList.length === 0 || !idAdding} className="custom-select" onChange={onRouteSelect}>
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
                  <textarea value={enteredText.note} className="form-control" maxLength="150" onChange={(e) => setEnteredText({...enteredText, note: e.target.value})}/>
                </div>
              </div>

              <div className="activity__window_form-right">
                <div className="activity__window_form-item">
                    <label>Data rozpoczęcia: </label>
                    <input value={enteredText.startDate} type="date" className="form-control" onChange={(e) => setEnteredText({...enteredText, startDate: e.target.value})}/>
                </div>
                <div className="activity__window_form-item">
                    <label>Godzina rozpoczęcia: </label>
                    <input value={enteredText.startTime} type="time" className="form-control" onChange={(e) => setEnteredText({...enteredText, startTime: e.target.value})}/>
                </div>
                <div className="activity__window_form-item">
                    <label>Data zakończenia: </label>
                    <input value={enteredText.endDate} type="date" className="form-control" onChange={(e) => setEnteredText({...enteredText, endDate: e.target.value})}/>
                </div>
                <div className="activity__window_form-item">
                    <label>Godzina zakończenia: </label>
                    <input value={enteredText.endTime} type="time" className="form-control" onChange={(e) => setEnteredText({...enteredText, endTime: e.target.value})}/>
                </div>
                <button 
                  disabled={errors.regions || errors.time || errors.wrongTime}
                  style={{width: "9em"}} 
                  className="btn btn-secondary" 
                  type="submit">
                  {idAdding ? "Dodaj treningu" : "Edytuj trening"}
                </button>
                <div className="activity__window_form-errors">
                    <ul style={{color: "#d32f2f"}}>
                      <li style={!errors.regions ? {display: "none"} : null}>Brak wybranego regionu, trasy lub drogi</li>
                      <li style={!errors.time ? {display: "none"} : null}>Brak czasu rozpoczęcia lub zakończenia treningu</li>
                      <li style={!errors.wrongTime ? {display: "none"} : null}>Czas zakończenia treningu nie może wypadać przed jego rozpoczęciem</li>
                      <li style={!requestStatus ? {display: "none"} : null}>Wystąpił błąd serwera w trakcie dodawania treningu</li>
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
