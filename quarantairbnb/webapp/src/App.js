import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import { Route, withRouter } from "react-router";
import RegistrationPage from "./components/RegistrationPage";

// we should add routing here based on token/router I guess
function App() {
  return (
    <>
      <Route exact path="/" component={LandingPage} />
      <Route path="/register" component={RegistrationPage} />
    </>
  );
}

export default withRouter(App);
