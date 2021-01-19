import "./_place.scss";
import { ReactComponent as Trash } from '../../images/svg/trash.svg';
import { ReactComponent as Edit } from '../../images/svg/edit.svg';
import { editRouteRequest, editPlaceRequest, editRegionRequest, getRouteDetailsById, getPlaceDetailsById, allSimpleItemsRequest, addRegionRequest, addPlaceRequest, addRouteRequest, deleteRouteRequest, deletePlaceRequest, deleteRegionRequest } from "../../helpers/ApiRequests"
import { placeType, realizationType, rappelStanceType, routeType, scaleType } from "../../helpers/ApplicationTypes"
import { findPlacesByRegionId, findRoutesByPlaceId } from "../../helpers/RegionsMethods"
import React, { useState, useEffect } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import Header from "../Header/Header";

const Place = (props) => {
  const { user } = props
  const [firstLoad, setFirstLoad] = useState(false) 
  const [editMode, setEditMode] = useState({add: true, regions: false, places: false, routes: false}) 
  const [editItemId, setEditItemId] = useState(-1) 
  const [itemList, setItemList] = useState({regions: [], places: [], routes: []})
  const [addRegionInput, setAddRegionInput] = useState({name: ""})
  const [addPlaceInput, setAddPlaceInput] = useState({name: "", lon: "", lat: "", type: 1, reg: -1})
  const [addRouteInput, setAddRouteInput] = useState({name: "", len: "", heiDif: "", status: 1, mat: "", sca: 1, rat: "", rin: 0, type: 1, rap: 1, reg: -1, pla: -1, list: []})
  let history = useHistory();

  const refreshAllItems = () => {
    allSimpleItemsRequest(user, setItemList)
  }
 
  const setUpPlaceAddingFrom = () => {
    if(itemList.regions.length > 0)
      setAddPlaceInput({...addPlaceInput, reg: itemList.regions[0].regionId})
  }

  const setUpRouteAddingFrom = () => {
    if(itemList.regions.length > 0) {
      if(itemList.places.length > 0) {
        const places = findPlacesByRegionId(itemList.places, itemList.regions[0].regionId)
        if(places.length > 0) {
          setAddRouteInput({...addRouteInput, reg: itemList.regions[0].regionId, list: places})
        }
        else {
          setAddRouteInput({...addRouteInput, reg: itemList.regions[0].regionId, list: []})
        }
      }
      else {
        setAddRouteInput({...addRouteInput, reg: -1, list: []})
      }
    }
    else 
    {
      setAddRouteInput({...addRouteInput, reg: -1, list: []})
    }
  }

  const onSetPlacesForSelectedRegion = (id) => {
    const places = findPlacesByRegionId(itemList.places, id)
    if(places.length > 0) 
      setAddRouteInput({...addRouteInput, reg: id, list: places, pla: places[0].placeId})
    else 
      setAddRouteInput({...addRouteInput, reg: id, list: []})
  }

  const onRegionsFormSubmit = (e) => {
    e.preventDefault()

    if(editMode.add) {
      const onAddCallBackFunctions =  { 
        succes: (response) => {
          history.push('/places');
          refreshAllItems()
          alert(`Pomyślnie dodano region: ${addRegionInput.name}`)
        },
        error: (response) => {
          alert(`W trakcie dodawania nowego regionu, wystąpił problem: ${response.message}`)
        }
      }
      const regionData = {
        RegionName: addRegionInput.name
      }
      addRegionRequest(user, regionData, onAddCallBackFunctions)
    }
    else if(editMode.regions) {
      const onEditCallBackFunctions =  { 
        succes: (response) => {
          history.push('/places');
          refreshAllItems()
          alert(`Pomyślnie zmodyfikowano region: ${addRegionInput.name}`)
        },
        error: (response) => {
          alert(`W trakcie modyfikacji regionu, wystąpił problem.`)
        }
      }
      const regionData = {
        RegionId: editItemId,
        RegionName: addRegionInput.name
      }
      editRegionRequest(user, regionData, onEditCallBackFunctions)
    }
  }

  const onPlaceFormSubmit = (e) => {
    e.preventDefault()
    if(editMode.add) {
      const onAddCallBackFunctions =  { 
        succes: (response) => {
          history.push('/places');
          refreshAllItems()
          alert(`Pomyślnie dodano miejsce: ${addPlaceInput.name}`)
        },
        error: (response) => {
          alert(`W trakcie dodawania nowego miejsca, wystąpił problem: ${response.message}`)
        }
      }
      const placeData = {
        placeName: addPlaceInput.name,
        latitude: addPlaceInput.lat,
        longitude: addPlaceInput.lon,
        placeType: +addPlaceInput.type,
        belongRegionId: +addPlaceInput.reg,
      }
      addPlaceRequest(user, placeData, onAddCallBackFunctions)
    }
    else if(editMode.places) {
      const onEditCallBackFunctions =  { 
        succes: (response) => {
          history.push('/places');
          refreshAllItems()
          alert(`Pomyślnie zmodyfikowano miejsce: ${addPlaceInput.name}`)
        },
        error: (response) => {
          alert(`W trakcie modyfikowania miejsca, wystąpił problem.`)
        }
      }
      const placeData = {
        placeId: editItemId,
        placeName: addPlaceInput.name,
        latitude: addPlaceInput.lat,
        longitude: addPlaceInput.lon,
        placeType: +addPlaceInput.type,
        belongRegionId: +addPlaceInput.reg,
      }
      editPlaceRequest(user, placeData, onEditCallBackFunctions)
    }
  }

  const onRouteFormSubmit = (e) => {
    e.preventDefault()
    if(editMode.add) {
      const onAddCallBackFunctions =  { 
        succes: (response) => {
          history.push('/places');
          refreshAllItems()
          alert(`Pomyślnie dodano drogę: ${addPlaceInput.name}`)
        },
        error: (response) => {
          alert(`W trakcie dodawania nowej drogi, wystąpił problem: ${response.message}`)
        }
      }
      const routeData = {
        routeName: addRouteInput.name,
        routeType: addRouteInput.type,
        length: +addRouteInput.len,
        heightDifference: +addRouteInput.heiDif,
        accomplish: addRouteInput.status,
        material: addRouteInput.mat,
        scale: +addRouteInput.sca,
        rating: addRouteInput.rat,
        rings: addRouteInput.rin,
        descentPosition: addRouteInput.rap,
        belongPlaceId: addRouteInput.pla,
      }
      addRouteRequest(user, routeData, onAddCallBackFunctions)
    }
    else if(editMode.routes) {
      const onEditCallBackFunctions =  { 
        succes: (response) => {
          history.push('/places');
          refreshAllItems()
          alert(`Pomyślnie zmodyfikowano drogę: ${addPlaceInput.name}`)
        },
        error: (response) => {
          alert(`W trakcie modyfikacji drogi, wystąpił problem.`)
        }
      }
      const routeData = {
        routeId: editItemId,
        routeName: addRouteInput.name,
        routeType: addRouteInput.type,
        length: +addRouteInput.len,
        heightDifference: +addRouteInput.heiDif,
        accomplish: addRouteInput.status,
        material: addRouteInput.mat,
        scale: +addRouteInput.sca,
        rating: addRouteInput.rat,
        rings: addRouteInput.rin,
        descentPosition: addRouteInput.rap,
        belongPlaceId: addRouteInput.pla,
      }
      editRouteRequest(user, routeData, onEditCallBackFunctions)
    }
  }

  const onRegionDelete = (region) => {
    const onDeleteCallBackFunctions =  { 
      succes: (response) => {
        history.push('/places');
        refreshAllItems()
        alert(`Pomyślnie usunięto region: ${region.regionName}`)
      },
      error: (response) => {
        alert(`W trakcie usuwania regionu, wystąpił błąd. Upewnij się, że lista miejsc w regionie jest pusta.`)
      }
    }
    const regionId = { id: region.regionId }
    deleteRegionRequest(user, regionId, onDeleteCallBackFunctions)
  }

  const onPlaceDelete = (place) => {
    const onDeleteCallBackFunctions =  { 
      succes: (response) => {
        history.push('/places');
        refreshAllItems()
        alert(`Pomyślnie usunięto miejsce: ${place.placeName}`)
      },
      error: (response) => {
        alert(`W trakcie usuwania miejsca, wystąpił błąd. Upewnij się, że lista tras w wybranym miejscu jest pusta`)
      }
    }

    const placeId = {
      id: place.placeId,
    }

    deletePlaceRequest(user, placeId, onDeleteCallBackFunctions)
  }

  const onRouteDelete = (route) => {
    const onDeleteCallBackFunctions =  { 
      succes: (response) => {
        history.push('/places');
        refreshAllItems()
        alert(`Pomyślnie usunięto trasę: ${route.routeName}`)
      },
      error: (response) => {
        alert(`W trakcie usuwania trasy, wystąpił błąd. Może to oznaczać, że usuwana trasa przypisana jest do któregoś z odbytych treningów.`)
      }
    }

    const routeId = {
      id: route.routeId,
    }

    deleteRouteRequest(user, routeId, onDeleteCallBackFunctions)
  }

  const onAddRegionPlaceOfRoute = () => {
    setAddRegionInput({name: ""})
    setAddPlaceInput({name: "", lon: "", lat: "", type: 1, reg: -1})
    setAddRouteInput({name: "", len: "", heiDif: "", status: 1, mat: "", sca: 1, rat: "", rin: 0, type: 1, rap: 1, reg: -1, pla: -1, list: []})
    setEditMode({add: true, regions: false, places: false, routes: false})
    history.push('places/add')
  }

  const onRegionEdit = (region) => {
    setAddPlaceInput({name: "", lon: "", lat: "", type: 1, reg: -1})
    setAddRouteInput({name: "", len: "", heiDif: "", status: 1, mat: "", sca: 1, rat: "", rin: 0, type: 1, rap: 1, reg: -1, pla: -1, list: []})
    setAddRegionInput({name: region.regionName})
    setEditMode({add: false, regions: true, places: false, routes: false})
    setEditItemId(region.regionId)
    history.push('places/add')
  }

  const onPlaceEdit = (place) => {
    const onGetDetailsCallBackFunctions =  { 
      succes: (response) => {
        const data = response.data;
        setAddPlaceInput({name: data.placeName, lon: data.longitude, lat: data.latitude, type: data.placeType, reg: data.belongRegion.regionId})
      },
      error: (response) => {
        alert(`W trakcie pobierania dodatkowych informacji na temat edytowanego miejsca wystąpił błąd.`) 
      }
    } 
    setAddRegionInput({name: ""})
    setAddRouteInput({name: "", len: "", heiDif: "", status: 1, mat: "", sca: 1, rat: "", rin: 0, type: 1, rap: 1, reg: -1, pla: -1, list: []})
    getPlaceDetailsById(user, place.placeId, onGetDetailsCallBackFunctions)
    setEditItemId(place.placeId)
    setEditMode({add: false, regions: false, places: true, routes: false})
    history.push('places/add')

  }

  const onRouteEdit = (route) => {
    const onGetDetailsCallBackFunctions =  { 
      succes: (response) => {
        const data = response.data;
        setAddRouteInput({name: data.routeName, len: data.length, heiDif: data.heightDifference, status: data.accomplish, mat: data.material, sca: data.scale, rat: data.rating, rin: data.rings, type: data.routeType, rap: data.descentPosition, reg: data.belongPlace.belongRegion.regionId, pla: data.belongPlace.placeId, list: findPlacesByRegionId(itemList.places, data.belongPlace.belongRegion.regionId)})
      },
      error: (response) => {
        alert(`W trakcie pobierania dodatkowych informacji na temat edytowanego miejsca wystąpił błąd.`)
      }
    } 
    setAddRegionInput({name: ""})
    setAddPlaceInput({name: "", lon: "", lat: "", type: 1, reg: -1})
    getRouteDetailsById(user, route.routeId, onGetDetailsCallBackFunctions)
    setEditItemId(route.routeId)
    setEditMode({add: false, regions: false, places: false, routes: true})
    history.push('places/add')
  }

  const generateAddAndEditHeader = () => {
    if(editMode.add)
      return <h2>Dodaj miejsca i regiony</h2>
    else if(editMode.regions)
      return <h2>Edytuj region</h2>
    else if(editMode.places)
      return <h2>Edytuj miejsce</h2>
    else if(editMode.routes)
      return <h2>Edytuj trasę</h2>
  }

  const generateRouteItem = (route, index) => {

    return (
      <div className="place__route">
        <div className="place__route_top">
          <p className="place__route_name">{route.routeName}</p>
          <div className="place__route_icons">
            <div onClick={e => onRouteEdit(route)}><Edit style={{ height: "1.4em", marginRight: "0.25em"}} /></div>
            <div onClick={e => onRouteDelete(route)}><Trash style={{ height: "1.4em"}} /></div>
          </div>
        </div>
      </div> 
    );
  } 

  const generatePlaceItem = (place, index) => {
 
    return ( 
      <div className="place__place"> 
        <div className="place__place_top"> 
          <p className="place__place_name">{place.placeName}</p>
          <div className="place__place_icons">
            <div onClick={e => onPlaceEdit(place)}><Edit style={{ height: "1.4em", marginRight: "0.2em"}} /></div>
            <div onClick={e => onPlaceDelete(place)}><Trash style={{ height: "1.4em"}} /></div>
          </div>
        </div>
        <div className="place__window_line"></div> 
        <div className="place__place_bottom">
          {findRoutesByPlaceId(itemList.routes, place.placeId).map((route, routeIndex) => {
              return generateRouteItem(route, routeIndex)
          })}
        </div>
      </div>
    ); 
  } 

  const generateRegionItem = (region, index) => {
    return( 
      <div className="place__region">
        <div className="place__region_top">
          <p className="place__region_name"><span>Region:</span> {region.regionName}</p>
          <div className="place__controll-buttons">
            <p onClick={e => onRegionEdit(region)} className="btn btn-secondary">Edytuj</p>
            <p onClick={e => onRegionDelete(region)} className="btn btn-secondary">Usuń</p>
          </div>
        </div>
        <div className="place__window_line"></div>
        <div className="place__region_bottom">
          {findPlacesByRegionId(itemList.places, region.regionId).map((place, placeIndex) => {
              return generatePlaceItem(place, placeIndex)
          })}
        </div>
      </div>
    );
  }

  const generateRegionsList = () => {
    return itemList.regions.map((region, index) => 
        <div className="place__window_item" key={index}>
          {generateRegionItem(region, index)}
        </div>
    );
  }

  useEffect(() => {
    if (user.id === -1)
      history.push("/login")
    else if(!firstLoad) {
      refreshAllItems()
      setFirstLoad(true)
    }
  }, [user, firstLoad, history]);

  useEffect(() => {
    setUpPlaceAddingFrom()
    setUpRouteAddingFrom()
  }, [itemList])

  return (
    <section className="place"> 
      <Header user={user}/>
      <Route exact path="/places">
        <article className="place__window">
            <div className="place__window_top">
                <h2>Lista miejsc</h2>
                <p onClick={e => {onAddRegionPlaceOfRoute()}} className="btn btn-secondary">Dodaj</p>
            </div>
            <div className="place__window_line"></div>
            <div className="place__window_items">
                {generateRegionsList()}
            </div>
        </article>
      </Route> 
      <Route exact path="/places/add">
        <article className="place__window">
            {generateAddAndEditHeader()}
            <div className="place__window_line"></div>
            <div className="place__window_forms">
              <div className="place__window_left-forms">
                <form onSubmit={onRegionsFormSubmit} className="place__window_form-region">
                    <h3>Dodawanie regionów</h3>
                    <div className="place__window_form-item">
                        <label>Nazwa regionu: </label>
                        <input onChange={e => setAddRegionInput({name: e.target.value})} value={addRegionInput.name} type="text" className="form-control"/>
                    </div>
                    <button className="btn btn-secondary" type="submit"  disabled={!editMode.regions && !editMode.add}>
                      {editMode.add ? "Dodaj region" : "Edytuj region"}
                    </button>
                </form>
                <form onSubmit={onPlaceFormSubmit} className="place__window_form-place">
                    <h3>Dodawanie miejsc</h3>
                    <div className="place__window_form-item">
                        <label>Nazwa miejsca: </label>
                        <input onChange={e => setAddPlaceInput({...addPlaceInput, name: e.target.value})} value={addPlaceInput.name} type="text" className="form-control"/>
                    </div>
                    <div className="place__window_form-item">
                        <label>Długość geo. : </label>
                        <input onChange={e => setAddPlaceInput({...addPlaceInput, lon: e.target.value})} value={addPlaceInput.lon} type="text" className="form-control"/>
                    </div>
                    <div className="place__window_form-item">
                        <label>Szerokość geo. : </label>
                        <input onChange={e => setAddPlaceInput({...addPlaceInput, lat: e.target.value})} value={addPlaceInput.lat} type="text" className="form-control"/>
                    </div>
                    <div className="place__window_form-item">
                      <label>Typ miejsca: </label>
                      <select onChange={e => setAddPlaceInput({...addPlaceInput, type: Number(e.target.value)})} value={addPlaceInput.type} className="custom-select">
                        <option defaultValue value="1">{placeType(1)}</option>
                        <option value="2">{placeType(2)}</option>
                        <option value="3">{placeType(3)}</option>
                      </select>
                    </div>
                    <div className="place__window_form-item">
                      <label>Region: </label>
                      <select onChange={e => setAddPlaceInput({...addPlaceInput, reg: Number(e.target.value)})} value={addPlaceInput.reg} className="custom-select">
                        {itemList.regions.map((item, index) => {
                          if(index === 1)
                            return <option defaultValue value={item.regionId} key={index}>{item.regionName}</option>;
                          else 
                            return <option value={item.regionId} key={index}>{item.regionName}</option>
                        })}
                      </select>
                    </div>
                    <button className="btn btn-secondary" type="submit" disabled={!editMode.places && !editMode.add}>
                      {editMode.add ? "Dodaj miejsce" : "Edytuj miejsce"}
                    </button>
                </form>
              </div>
              <div className="place__window_right-forms">
                <div>
                <form onSubmit={onRouteFormSubmit} className="place__window_form-region">
                    <h3>Dodawanie trasy</h3>
                    <div className="place__window_form-item">
                      <label>Nazwa trasy: </label>
                      <input onChange={e => setAddRouteInput({...addRouteInput, name: e.target.value})} value={addRouteInput.name} type="text" className="form-control"/>
                    </div>
                    <div className="place__window_form-item">
                      <label>Długość: </label>
                      <input onChange={e => setAddRouteInput({...addRouteInput, len: e.target.value})} value={addRouteInput.len} type="number" min={0} className="form-control"/>
                    </div>
                    <div className="place__window_form-item">
                      <label>Przewyższenie: </label>
                      <input onChange={e => setAddRouteInput({...addRouteInput, heiDif: e.target.value})} value={addRouteInput.heiDif} type="number" className="form-control"/>
                    </div>
                    <div className="place__window_form-item">
                      <label>Status: </label>
                      <select onChange={e => setAddRouteInput({...addRouteInput, status: Number(e.target.value)})} value={addRouteInput.status} className="custom-select">
                        <option defaultValue value="1">{realizationType(1)}</option>
                        <option value="2">{realizationType(2)}</option>
                        <option value="3">{realizationType(3)}</option>
                        <option value="4">{realizationType(4)}</option>
                      </select>
                    </div>
                    <div className="place__window_form-item">
                      <label>Materiał: </label>
                      <input onChange={e => setAddRouteInput({...addRouteInput, mat: e.target.value})} value={addRouteInput.mat} type="text" className="form-control"/>
                    </div>
                    <div className="place__window_form-item">
                      <label>Skala: </label>
                      <select onChange={e => setAddRouteInput({...addRouteInput, sca: e.target.value})} value={addRouteInput.sca} className="custom-select">
                        <option defaultValue value="1">{scaleType(1)}</option>
                        <option value="2">{scaleType(2)}</option>
                        <option value="3">{scaleType(3)}</option>
                      </select>
                    </div>
                    <div className="place__window_form-item">
                        <label>Wycena: </label>
                        <input onChange={e => setAddRouteInput({...addRouteInput, rat: e.target.value})} value={addRouteInput.rat} type="text" className="form-control"/>
                    </div>
                    <div className="place__window_form-item">
                        <label>Ringi: </label>
                        <input onChange={e => setAddRouteInput({...addRouteInput, rin: Number(e.target.value)})} value={addRouteInput.rin} type="number" min={0} className="form-control"/>
                    </div>
                    <div className="place__window_form-item">
                      <label>Typ trasy: </label>
                      <select onChange={e => setAddRouteInput({...addRouteInput, type: Number(e.target.value)})} value={addRouteInput.type} className="custom-select">
                        <option defaultValue value="1">{routeType(1)}</option>
                        <option value="2">{routeType(2)}</option>
                      </select>
                    </div>
                    <div className="place__window_form-item">
                      <label>Stanowisko: </label>
                      <select onChange={e => setAddRouteInput({...addRouteInput, rap: Number(e.target.value)})} value={addRouteInput.rap} className="custom-select">
                        <option defaultValue value="1">{rappelStanceType(1)}</option>
                        <option value="2">{rappelStanceType(2)}</option>
                        <option value="3">{rappelStanceType(3)}</option>
                      </select>
                    </div>
                    <div className="place__window_form-item">
                      <label>Region: </label>
                      <select onChange={e => onSetPlacesForSelectedRegion(Number(e.target.value))} value={addRouteInput.reg} className="custom-select">
                        {itemList.regions.map((item, index) => {
                          if(index === 1)
                            return <option defaultValue value={item.regionId} key={index}>{item.regionName}</option>;
                          else 
                            return <option value={item.regionId} key={index}>{item.regionName}</option>
                        })}
                      </select>
                    </div>
                    <div className="place__window_form-item">
                      <label>Miejsce: </label>
                      <select onChange={e => setAddRouteInput({...addRouteInput, pla: Number(e.target.value)})} value={addRouteInput.pla} disabled={addRouteInput.list.length === 0} className="custom-select">
                        {addRouteInput.list.map((item, index) => { 
                          if(index === 1)
                            return <option defaultValue value={item.placeId} key={index}>{item.placeName}</option>;
                          else 
                            return <option value={item.placeId} key={index}>{item.placeName}</option>
                        })}
                      </select>
                    </div>
                    <button className="btn btn-secondary" type="submit" disabled={!editMode.routes && !editMode.add}>
                      {!editMode.routes ? "Dodaj trasę" : "Edytuj trasę"}
                    </button>
                </form>
                </div>
              </div>
            </div>
            
        </article>
      </Route>  
    </section>
  );
};

export default Place;
 