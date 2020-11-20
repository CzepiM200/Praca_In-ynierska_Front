import "./_profile.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Profile = (props) => {
  
  return (
    <section className="profile">
        <article className="profile__main">
            <h3 className="profile__main_user">Marcin Czepiela</h3>
            <section className="profile__main_items">
                <div className="profile__main_item">
                    <h4>Szczyty</h4>
                    <p>10</p>
                </div>
                <div className="profile__main_item">
                    <h4>Drogi</h4>
                    <p>4</p>
                </div>
                <div className="profile__main_item">
                    <h4>Razem</h4>
                    <p>14</p>
                </div>
            </section>
        </article>
        <div className="profile__line"></div>
        <article className="profile__recent">
            <h3>Ostatnio zdobyte szczyty</h3>
            <section className="profile__recent_items">
                <div className="profile__recent_item">
                    <p>1. Mały Kozi</p>
                </div>
                <div className="profile__recent_item">
                    <p>2. Kasprowy</p>
                </div>
                <div className="profile__recent_item">
                    <p>3. Granaty</p>
                </div>
            </section>
        </article>
        <div className="profile__line"></div>
        <article className="profile__recent">
            <h3>Ostatnio zrobione drogi</h3>
            <section className="profile__recent_items">
                <div className="profile__recent_item">
                    <p>1. Tępa i Ptak</p>
                </div>
                <div className="profile__recent_item">
                    <p>2. Płetwa</p>
                </div>
                <div className="profile__recent_item">
                    <p>3. Baba</p>
                </div>
            </section>
        </article>
        
    </section>
  );
};

export default Profile;
