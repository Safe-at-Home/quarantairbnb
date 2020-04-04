import React from 'react';
import {Layout, Menu, Row} from "antd";
import "../App.css"
import ProgressStep from '@bit/nexxtway.react-rainbow.progress-step';
import ProgressIndicator from '@bit/nexxtway.react-rainbow.progress-indicator';
import {Link} from "react-router-dom";

export const Sidebar = (props) => (
  <Layout.Sider style={{background: "white"}}>
    {props.children}
  </Layout.Sider>
);

export const GuestMenu = (props) => (
  <Menu mode="inline">
    <Menu.Item>
      <OffersLink offerCreated={props.offerCreated}/>
    </Menu.Item>
    <Menu.Item>
      <Link to="/guest/messages" disabled={!props.matched}>Matched offer</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/guest/messages" disabled={!props.matched}>My messages</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/guest/settings">Settings</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/guest/moderatormessages">Contact a moderator</Link>
    </Menu.Item>
  </Menu>
);

export const HostMenu = (props) => (
  <Menu mode="inline">
    <Menu.Item>
      <OffersLink offerCreated={props.offerCreated}/>
    </Menu.Item>
    <Menu.Item>
      <Link to="/host/messages" disabled={!props.matched}>Matched offer</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/host/messages" disabled={!props.matched}>My messages</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/host/settings">Settings</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/host/moderatormessages">Contact a moderator</Link>
    </Menu.Item>
  </Menu>
);

export const ProgressBar = (props) => (
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