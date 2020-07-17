import React from "react";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import About from "../components/about";
import Login from "../components/RegisterLogin";
import Register from "./RegisterLogin/register";

function App() {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to={"/"} className="brand-logo">
            Boiler Plate
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to={"/about"}>About Me </Link>
            </li>
            <li>
              <Link to={"/login"}>Log In </Link>
            </li>
            <li>
              <Link to={"/register"}>Sign Up </Link>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to={"/"}>About Me</Link>
        </li>
        <li>
          <Link to={"/"}></Link>Log In
        </li>
        <li>
          <Link to={"/"}></Link>Sign Up
        </li>
      </ul>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
