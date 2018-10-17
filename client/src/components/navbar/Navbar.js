import React, { Component } from "react";
import "./navbar.css";
import logo from "../svg/TapCodeLogo.svg";
import profile from "../svg/NavProfile.svg";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="tap-navbar">
        <Link to="/room">
          <div className="tap-navbrand">
            <img src={logo} alt="TapCode Home" />
          </div>
        </Link>
        <Link to="/">
          <div className="tap-navbrand">
            <img src={profile} alt="Access profile settings" />
          </div>
        </Link>
      </nav>
    );
  }
}
