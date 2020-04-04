import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import {Route, withRouter} from "react-router";
import LoginRegistrationScreen from "./components/LoginRegistrationScreen";
import GuestPanel from "./components/GuestPanel";
import HostPanel from "./components/HostPanel";

// we should add routing here based on token/router I guess
function App() {
  return (
    <>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/login" render={(props) => <LoginRegistrationScreen {...props} isLogin={true}/>}/>
      <Route path="/registerHost" render={(props) => <LoginRegistrationScreen {...props} isLogin={false} isHost={true}/>}/>
      <Route path="/registerGuest" render={(props) => <LoginRegistrationScreen {...props} isLogin={false} isHost={false}/>}/>
      <Route path="/guest" component={GuestPanel}/>
      <Route path="/host" component={HostPanel}/> 
    </>
  );
}

export default withRouter(App);
