import React from 'react';
import {withRouter} from "react-router";
import {Layout, Menu, Row} from "antd";
import "./App.css"
import ProgressStep from '@bit/nexxtway.react-rainbow.progress-step';
import ProgressIndicator from '@bit/nexxtway.react-rainbow.progress-indicator';
import Settings from "./settings";
import Messages, {ModeratorMessages} from "./messages";
import Offers from "./offers";
import {Route, Link} from "react-router-dom";

function UserPanel() {
  return (
    <Layout className="full-page-layout">
      <Sidebar/>
      <Layout>
        <ProgressBar
          stepNames={['Request help', 'Wait for the moderator\'s approval', 'Wait for a match', 'Chat with your match', 'All done!']}
          currentStepIndex={1}/>
        <Route path="/userpanel/offers" component={Offers}/>
        <Route path="/userpanel/messages" component={Messages}/>
        <Route path="/userpanel/settings" component={Settings}/>
        <Route path="/userpanel/moderatormessages" component={ModeratorMessages}/>
      </Layout>
    </Layout>
  )
}

const Sidebar = () => (
  <Layout.Sider style={{background: "white"}}>
    <HostMenu offerCreated={true} matched={true}/>
  </Layout.Sider>
);

const GuestMenu = () => (
  <Menu mode="inline">
    <Menu.Item>
      My request
    </Menu.Item>
    <Menu.Item>
      My messages
    </Menu.Item>
    <Menu.Item>
      Settings
    </Menu.Item>
    <Menu.Item>
      Contact a moderator
    </Menu.Item>
  </Menu>
);

const HostMenu = (props) => (
  <Menu mode="inline">
    <Menu.Item>
      <OffersLink offerCreated={props.offerCreated}/>
    </Menu.Item>
    <Menu.Item>
      <Link to="/userpanel/messages" disabled={!props.matched}>Matched offer</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/userpanel/messages" disabled={!props.matched}>My messages</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/userpanel/settings">Settings</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/userpanel/moderatormessages">Contact a moderator</Link>
    </Menu.Item>
  </Menu>
);

const ProgressBar = (props) => (
  <Layout.Header style={{background: "whitesmoke"}}>
    <Row justify="center" type="flex" align="middle">
        <ProgressIndicator currentStepName={props.stepNames[props.currentStepIndex]}>
          <ProgressStep name={props.stepNames[0]}/>
          <ProgressStep name={props.stepNames[1]}/>
          <ProgressStep name={props.stepNames[2]}/>
          <ProgressStep name={props.stepNames[3]}/>
          <ProgressStep name={props.stepNames[4]}/>
        </ProgressIndicator>
    </Row>
    <Row justify="center" type="flex" align="middle">
      <p>{props.stepNames[props.currentStepIndex]}</p>
    </Row>
  </Layout.Header>
);

const OffersLink = (props) => {
  if (props.offerCreated) return (
    <Menu.Item>
      <Link to="/userpanel/offer">My offer</Link>
    </Menu.Item>
  );
  else return (
    <Menu.Item>
      <Link to="/userpanel/offer">Create an offer</Link>
    </Menu.Item>
  );
};

export default withRouter(UserPanel);