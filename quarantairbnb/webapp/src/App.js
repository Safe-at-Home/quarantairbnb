import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import {Route, withRouter} from "react-router";
import LoginRegistrationScreen from "./LoginRegistrationScreen";

// we should add routing here based on token/router I guess
function App() {
  return (
    <>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/login" render={(props) => <LoginRegistrationScreen {...props} tabIndex={"login"}/>}/>
      <Route path="/register" render={(props) => <LoginRegistrationScreen {...props} tabIndex={"register"}/>}/>
    </>
  );
}

export default withRouter(App);
