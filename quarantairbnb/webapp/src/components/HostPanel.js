import {Button, Col, Layout, Menu, Row} from "antd";
import Messages, {ModeratorMessages} from "./messages";
import React, {useState} from "react";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import OffersList from "./OffersList";
import {Container, Image, Segment} from "semantic-ui-react";

function HostPanel({authorized, role, offers}) {
  const [screen, setScreen] = useState("request");

  return (
    <>
      {authorized ? (
        <>
          {role === "host" ? (
            <Layout>
              <UserPanelHeader/>
              <Layout.Content>
                <Layout style={{minHeight: "100vh"}}>
                  <Layout.Sider>
                    <div style={{padding: "20px 0 0 20px"}}>
                      <h1 style={{color: "#eee"}}>Safe at Home</h1>
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
                  <Layout>
                    {screen === "request" ? (
                      <OffersList/>
                    ) : (
                      <>
                        {screen === "messages" ? (
                          <Messages/>
                        ) : (
                          <ModeratorMessages/>
                        )}
                      </>
                    )}
                  </Layout>
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

const UserPanelHeader = () => {
  const fixed = false;

  return (
    <Segment style={{padding: 5, backgroundColor: "#fff"}} vertical basic>
      <Menu
        fixed={fixed ? "top" : null}
        pointing={!fixed}
        secondary={!fixed}
        size="large"
      >
        <Container>
          <Row align="middle" style={{padding: 5, paddingTop: 10}}>
            <Col span={1}>
              <Image src="logo.png" size="mini" centered/>
            </Col>
            <Col span={22}>
              <h3>Safe at Home</h3>
            </Col>
            <Col span={1}>
              <Link to={"/"}>
                <Button>Log out</Button>
              </Link>
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
  offers: state.offers,
});
export default connect(mapStateToProps)(HostPanel);
