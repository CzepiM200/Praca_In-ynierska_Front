import "./_logIn.scss";
import React, { useState } from "react";
//import { ReactComponent as DecorationIcon } from "../../images/svg/Decoration.svg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";
import LogInEmail from "./LogInEmail/LogInEmail";

const LogIn = (props) => {

  return (
    <>
      <Header />
      <section className="login">
        <LogInEmail />
      </section>
    </>
  );
};

export default LogIn;