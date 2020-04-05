import {Button, Layout, Menu, Row, Col} from "antd";
import Messages, {ModeratorMessages} from "./messages";
import {Redirect} from "react-router";
import React, {useState} from "react";
import {connect} from "react-redux";
import { apiActionCreator } from "../actions/helpers";


import RequestManagement from "./RequestManagement";
import {Container, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";

function GuestPanel({authorized, role}) {
  const [screen, setScreen] = useState("request");
  return (
    <>
      {authorized ? (
        <>
          {role === "guest" ? (
            <Layout>
              <UserPanelHeader/>
              <Layout.Content>
                <Layout style={{minHeight: "100vh"}}>
                  <Layout.Sider>
                    <div style={{padding: "20px 0 0 20px"}}>
                    </div>
                    <Menu
                      theme="dark"
                      mode="inline"
                      onClick={(value) => setScreen(value.key)}
                      selectedKeys={[screen]}
                    >
                      <Menu.Item key="request">Your Request</Menu.Item>
                      <Menu.Item key="messages">My messages</Menu.Item>
                      <Menu.Item key="mod-messages">Contact moderator</Menu.Item>
                    </Menu>
                  </Layout.Sider>
                  {screen === "request" ? (
                    <RequestManagement/>
                  ) : (
                    <>
                      {screen === "messages" ? <Messages/> : <ModeratorMessages/>}
                    </>
                  )}
                </Layout>
              </Layout.Content>
            </Layout>
          ) : (
            <Redirect to={{pathname: `/${role}`}}/>
          )}
        </>
      ) : (
        <Redirect to={{pathname: "/login"}}/>
      )}
    </>
  );
}

const header = ({logOut}) => {
  const fixed = false;

  return (
    <Segment inverted style={{padding: 5, backgroundColor: "#efefef"}} vertical basic>
      <Menu
        fixed={fixed ? "top" : null}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
          <Row align="middle" style={{padding: 5, paddingTop: 10}}>
            <Col span={1}>
              <Image src="logo.png" size="mini" centered circular/>
            </Col>
            <Col span={22}>
              <h3>Safe at Home</h3>
            </Col>
            <Col span={1}>
                <Button onClick={logOut}>Log out</Button>
            </Col>
          </Row>
        </Container>
      </Menu>
    </Segment>
  );
};

const mapStateToProps = (state) => ({
  authorized: state.auth.authorized,
  role: state.auth.role,
});

const logOut = () => async dispatch => {
  return dispatch(apiActionCreator("LOG_OUT"))
}
const UserPanelHeader = connect(() => ({}), {logOut})(header)

export default connect(mapStateToProps)(GuestPanel);
