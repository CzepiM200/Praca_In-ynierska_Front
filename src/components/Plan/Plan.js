import "./_plan.scss";
import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import Header from "../Header/Header";

const Place = (props) => {
  const regionsList = [
      {
          name: "Sokoliki",
          places: ["Tępa i Ptak", "Płetwa", "Baba"],
      },
      {
          name: "Tatry",
          places: ["Mały Kozi", "Kasprowy", "Granaty"],
      },
  ];

  const setPlacesList = () => {
    return regionsList.map((region) => 
        <div className="place__window_item">
           <div className="place__window_item-top">
            <p><span>Nazwa regionu:</span> {region.name}</p>
            </div>
            <div className="place__window_line"></div>
            <div className="place__window_item-bottom">
                <p><span>Lista miejsc:</span></p>
                {region.places.map((item) => {
                    return <p>{item}, </p>
                })}
            </div>       
        </div>
    );
  }

  return (
    <section className="place">
      <Header />
      <Route exact path="/places">
        <acricle className="place__window">
            <div className="place__window_top">
                <h2>Lista miejsc</h2>
                <Link to="/places/add">
                    <p>Dodaj</p>
                </Link>
            </div>
            <div className="place__window_line"></div>
            <div className="place__window_items">
                {setPlacesList()}
            </div>
        </acricle>
      </Route> 
      <Route exact path="/places/add">
        <acricle className="place__window">
            <h2>Dodaj miejsca i regiony</h2>
            <div className="place__window_line"></div>
            <form className="place__window_form-region">
                <h3>Dodawanie regionów</h3>
                <div className="place__window_form-item">
                    <label>Nazwa regionu: </label>
                    <input type="text"/>
                </div>
                <button className="btn btn-secondary" type="submit">Dodaj region</button>
            </form>
            <form className="place__window_form-place" style={{height: "13em"}}>
                <h3>Dodawanie miejsc</h3>
                <div className="place__window_form-item">
                    <label>Nazwa miejsca: </label>
                    <input type="text"/>
                </div>
                <div className="place__window_form-item">
                    <label>Region: </label>
                    <select class="custom-select">
                        <option selected="">Wybierz region</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <button style={{width: "9em", marginRight: "1em"}} className="btn btn-secondary" type="submit">Dodaj miejsce</button>
            </form>
        </acricle>
      </Route>  
    </section>
  );
};

export default Place;
