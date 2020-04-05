import React, { useState } from "react";
import Messages, { ModeratorMessages } from "./messages";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import RequestManagement from "./RequestManagement";
import ModeratorRequests from "./ModeratorRequests";
import ModeratorOffers from "./ModeratorOffers";
import { Container, Image, Segment } from "semantic-ui-react";
import { Button, Col, Layout, Menu, Row } from "antd";
import { apiActionCreator } from "../actions/helpers";

const AdminPanel = ({ authorized, role }) => {
  const [screen, setScreen] = useState("pending-requests");
  return (
    <>
      {authorized ? (
        <>
          {role === "admin" ? (
            <Layout>
              <Layout.Content>
                <UserPanelHeader />
                <Layout style={{ minHeight: "100vh" }}>
                  <Layout.Sider>
                    <Menu
                      theme="dark"
                      mode="inline"
                      onClick={(value) => setScreen(value.key)}
                      selectedKeys={[screen]}
                    >
                      <Menu.Item key="pending-requests">
                        Pending request
                      </Menu.Item>
                      <Menu.Item key="pending-offers">Pending offers</Menu.Item>
                    </Menu>
                  </Layout.Sider>
                  {screen === "pending-requests" && <ModeratorRequests />}
                  {screen === "pending-offers" && <ModeratorOffers />}
                </Layout>
              </Layout.Content>
            </Layout>
          ) : (
            <Redirect to={{ pathname: `/${role}` }} />
          )}
        </>
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </>
  );
};

const header = ({ logOut }) => {
  const fixed = false;

  return (
    <Segment
      inverted
      style={{ padding: 5, backgroundColor: "#efefef" }}
      vertical
      basic
    >
      <Menu
        fixed={fixed ? "top" : null}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
          <Row align="middle" style={{ padding: 5, paddingTop: 10 }}>
            <Col span={1}>
              <Image src="logo.png" size="mini" centered circular />
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

const logOut = () => async (dispatch) => {
  return dispatch(apiActionCreator("LOG_OUT"));
};
const UserPanelHeader = connect(() => ({}), { logOut })(header);

export default connect(mapStateToProps)(AdminPanel);
