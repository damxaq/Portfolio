import React from "react";
import { NavLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import Resume from "./Resume";

export default function Navbar() {
  return (
    <header>
      <div className="navbar-container">
        <nav>
          <NavLink
            to="/"
            exact
            activeClassName="active-navlink"
            className="navlink"
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            activeClassName="active-navlink"
            className="navlink"
          >
            Projects
          </NavLink>
          <NavLink
            to="/workplaces"
            activeClassName="active-navlink"
            className="navlink"
          >
            Experience
          </NavLink>
          <NavLink
            to="/about"
            activeClassName="active-navlink"
            className="navlink"
          >
            About Me
          </NavLink>
          <Resume />
        </nav>
        <div className="social-icons-container">
          <SocialIcon
            url="https://github.com/damxaq"
            target="_blank"
            fgColor="#fff"
          />
          <SocialIcon
            url="https://www.linkedin.com/in/damian-celico/"
            target="_blank"
            fgColor="#fff"
          />
          <SocialIcon
            url="https://app.codesignal.com/profile/damian_c1"
            target="_blank"
            fgColor="#fff"
            network="foursquare"
          />
          <SocialIcon
            url="https://www.deviantart.com/damxaq"
            target="_blank"
            fgColor="#fff"
          />
        </div>
      </div>
    </header>
  );
}
