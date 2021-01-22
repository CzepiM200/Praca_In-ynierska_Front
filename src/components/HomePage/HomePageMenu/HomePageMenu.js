import "./_homePageMenu.scss";
import React, { useState } from "react";
import { ReactComponent as Add } from '../../../images/svg/plus.svg';
import { ReactComponent as List } from '../../../images/svg/list.svg';
import { ReactComponent as Plan } from '../../../images/svg/plan.svg';
import { ReactComponent as Sync } from '../../../images/svg/sync.svg';
import { ReactComponent as Check } from '../../../images/svg/check.svg';
import { ReactComponent as Clipboard } from '../../../images/svg/clipboard.svg';
//import { ReactComponent as DecorationIcon } from "../../images/svg/Decoration.svg";
import { BrowserRouter, Switch, Route, Link  } from "react-router-dom";
import { useHistory } from "react-router-dom";

const HomePageMenu = (props) => {
  const { user, setUser } = props;

  return (
    <>
      <section className="home-page-menu">
        <article className="home-page-menu__items">
            <Link to="/activity/add">
                <p className="home-page-menu__item">Dodaj aktywność</p>
                <Add/>
            </Link> 
            <Link to="/activity">
                <p className="home-page-menu__item">Przeglądaj aktywności</p>
                <List/>
            </Link> 
            <Link to="/strava">
                <p className="home-page-menu__item">Synchronizuj z STRAVA</p>
                <Sync/>
            </Link> 
            <Link to="/place/add">
                <p className="home-page-menu__item">Dodaj miejsce</p>
                <Plan/>
            </Link> 
            <Link to="/place"> 
                <p className="home-page-menu__item">Przeglądaj miejsca</p>
                <Clipboard/>
            </Link> 
            <Link onClick={(e) => {e.preventDefault(); setUser({id: -1})}} to="/">
                <p className="home-page-menu__item">Wyloguj</p>
                <Check/>
            </Link> 
        </article>
      </section>
    </> 
  );
};

export default HomePageMenu;