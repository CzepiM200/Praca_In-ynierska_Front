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

  return (
    <>
      <section className="home-page-menu">
        <article className="home-page-menu__items">
            <Link to="/activity/add">
                <p className="home-page-menu__item">Dodaj aktywność</p>
                <Add/>
            </Link> 
            <Link to="/activity">
                <p className="home-page-menu__item">Przegląd aktywności</p>
                <List/>
            </Link> 
            <Link to="/strava">
                <p className="home-page-menu__item">Synchronizuj z STRAVA</p>
                <Sync/>
            </Link> 
            <Link to="/plan/add">
                <p className="home-page-menu__item">Zaplanuj</p>
                <Plan/>
            </Link> 
            <Link to="/plan"> 
                <p className="home-page-menu__item">Lista planów</p>
                <Clipboard/>
            </Link> 
            <Link to="/plan/done">
                <p className="home-page-menu__item">Zrealizowane plany</p>
                <Check/>
            </Link> 
        </article>
      </section>
    </> 
  );
};

export default HomePageMenu;