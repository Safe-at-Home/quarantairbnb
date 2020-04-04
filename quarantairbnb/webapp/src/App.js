import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import { Route, withRouter } from "react-router";
import RegistrationPage from "./components/RegistrationPage";
import UserPanel from "./userPanel";

// we should add routing here based on token/router I guess
function App() {
  return (
    <>
      <Route exact path="/" component={LandingPage} />
      <Route path="/register" component={RegistrationPage} />
      <Route path="/userpanel" component={UserPanel}/>
    </>
  );
}

export default withRouter(App);
